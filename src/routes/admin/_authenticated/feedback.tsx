import { useState } from "react";
import { Eye, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createFileRoute } from "@tanstack/react-router";
import { useFeedbackFilter } from "@/hooks/useFeedbackFilters";
import useGetPaginatedFeedback from "@/integrations/tanstack-query/feedback/useGetPaginatedFeedback";
import type { FeedbackResponse } from "@/integrations/axios/feedback/feedback.schema";
import { Pagination } from "@/components/Pagination";
import { useUpdateFeedbackReviewStatus } from "@/integrations/tanstack-query/feedback/useUpdateFeedbackReviewStatus";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_authenticated/feedback")({
  component: RouteComponent,
});

export function RouteComponent() {
  const {
    reviewStatus,
    setReviewStatus,
    type,
    setType,
    currentPage,
    goToPage,
    queryParams,
  } = useFeedbackFilter();

  const [selectedFeedback, setSelectedFeedback] =
    useState<FeedbackResponse | null>(null);

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const { data } = useGetPaginatedFeedback(queryParams);
  const {
    mutateAsync: updateFeedbackReviewStatus,
    isPending: updateIsLoading,
  } = useUpdateFeedbackReviewStatus();
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-900 text-blue-300 border-blue-700";
      case "isReviewed":
        return "bg-green-900 text-green-300 border-green-700";
      default:
        return "bg-gray-700 text-gray-300 border-gray-600";
    }
  };

  async function handleUpdateStatus(
    feedbackId: number,
    reviewStatus: "new" | "reviewed",
  ) {
    let updatedReviewStatus: "new" | "reviewed" =
      reviewStatus === "new" ? "reviewed" : "new";
    try {
      await updateFeedbackReviewStatus({
        id: feedbackId,
        reviewStatus: updatedReviewStatus,
      });
      toast.success(
        `Feedback ${updatedReviewStatus === "reviewed" ? "marked as reviewed" : "marked as new"} successfully!`,
      );
      setSelectedFeedback(null);
      setIsUpdateOpen(false);
    } catch (error) {
      console.error("Error updating feedback status:", error);
      toast.error("Failed to update feedback status. Please try again.");
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Feedback Management</h1>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select
              value={reviewStatus}
              onValueChange={(v) =>
                setReviewStatus(v as "all" | "new" | "reviewed")
              }
            >
              <SelectTrigger className="w-full sm:w-48 bg-gray-700 border-gray-600 text-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem
                  value="all"
                  className="text-white hover:bg-gray-600"
                >
                  All Status
                </SelectItem>
                <SelectItem
                  value="new"
                  className="text-white hover:bg-gray-600"
                >
                  New
                </SelectItem>
                <SelectItem
                  value="reviewed"
                  className="text-white hover:bg-gray-600"
                >
                  Reviewed
                </SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={type}
              onValueChange={(v) =>
                setType(v as "all" | "feature" | "issue" | "other")
              }
            >
              <SelectTrigger className="w-full sm:w-48 bg-gray-700 border-gray-600 text-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem
                  value="all"
                  className="text-white hover:bg-gray-600"
                >
                  All Type
                </SelectItem>
                <SelectItem
                  value="feature"
                  className="text-white hover:bg-gray-600"
                >
                  Feature
                </SelectItem>
                <SelectItem
                  value="issue"
                  className="text-white hover:bg-gray-600"
                >
                  Issue
                </SelectItem>
                <SelectItem
                  value="other"
                  className="text-white hover:bg-gray-600"
                >
                  Other
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">
                    Message Preview
                  </TableHead>
                  <TableHead className="text-gray-300">Type</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Created At</TableHead>
                  <TableHead className="text-right text-gray-300">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.feedback.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-gray-700 hover:bg-gray-700/50"
                  >
                    <TableCell className="max-w-xs">
                      <p className="truncate text-gray-300">{item.content}</p>
                    </TableCell>
                    <TableCell>
                      <span className="text-yellow-400">{item.type}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.reviewStatus)}>
                        {item.reviewStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {item.createdAt}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                        onClick={() => {
                          setIsUpdateOpen(true);
                          setSelectedFeedback(item);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent className="max-w-2xl bg-gray-800 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">
                  Feedback Details
                </DialogTitle>
              </DialogHeader>
              {selectedFeedback && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-400">
                        Status
                      </label>
                      <Badge
                        className={getStatusColor(
                          selectedFeedback.reviewStatus,
                        )}
                      >
                        {selectedFeedback.reviewStatus}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-400">
                      Full Message
                    </label>
                    <div className="mt-1 p-3 bg-gray-700 rounded-lg">
                      <p className="text-white">{selectedFeedback.content}</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                      disabled={updateIsLoading}
                      onClick={() =>
                        handleUpdateStatus(
                          selectedFeedback.id,
                          selectedFeedback.reviewStatus,
                        )
                      }
                    >
                      {selectedFeedback.reviewStatus === "new"
                        ? "Mark as Reviewed"
                        : "Mark as New"}
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {data && data.totalCount !== undefined && data.totalCount > 0 && (
            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={data.lastPage || 1}
                onPageChange={goToPage}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
