import { useState, useEffect } from "react";
import { Search, Eye, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Textarea } from "@/components/ui/textarea";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_authenticated/feedback")({
  component: RouteComponent,
});

const feedbackData = [
  {
    id: 1,
    userNickname: "Alice",
    roomCode: "ABC123",
    messagePreview: "Great game! Really enjoyed the questions...",
    fullMessage:
      "Great game! Really enjoyed the questions and the overall experience. The interface is intuitive and the gameplay is smooth. Would love to see more question categories in the future.",
    status: "New",
    createdAt: "2024-01-15 14:30",
    rating: 5,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    userNickname: "Bob",
    roomCode: "XYZ789",
    messagePreview: "The game crashed during round 3...",
    fullMessage:
      "The game crashed during round 3 and I couldn't rejoin. This was frustrating as we were having a good time. Please fix the stability issues.",
    status: "Reviewed",
    createdAt: "2024-01-15 13:45",
    rating: 2,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    userNickname: "Carol",
    roomCode: "DEF456",
    messagePreview: "Love the new features! The scoring system...",
    fullMessage:
      "Love the new features! The scoring system is much better now and the questions are more engaging. Keep up the good work!",
    status: "New",
    createdAt: "2024-01-15 12:20",
    rating: 4,
    avatar: "/placeholder.svg?height=32&width=32",
  },
];

export function RouteComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedFeedback, setSelectedFeedback] = useState<
    (typeof feedbackData)[0] | null
  >(null);
  const [adminNotes, setAdminNotes] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredFeedback = feedbackData.filter((feedback) => {
    const matchesSearch =
      feedback.userNickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.roomCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.messagePreview.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      feedback.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Add pagination logic after filteredFeedback
  const totalPages = Math.ceil(filteredFeedback.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFeedback = filteredFeedback.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-900 text-blue-300 border-blue-700";
      case "reviewed":
        return "bg-green-900 text-green-300 border-green-700";
      default:
        return "bg-gray-700 text-gray-300 border-gray-600";
    }
  };

  const getRatingStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Feedback Management</h1>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by user, room code, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
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
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  {/* <TableHead className="text-gray-300">User</TableHead> */}
                  {/* <TableHead className="text-gray-300">Room Code</TableHead> */}
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
                {paginatedFeedback.map((feedback) => (
                  <TableRow
                    key={feedback.id}
                    className="border-gray-700 hover:bg-gray-700/50"
                  >
                    <TableCell className="max-w-xs">
                      <p className="truncate text-gray-300">
                        {feedback.messagePreview}
                      </p>
                    </TableCell>
                    <TableCell>
                      <span className="text-yellow-400">類型</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(feedback.status)}>
                        {feedback.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {feedback.createdAt}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                            onClick={() => setSelectedFeedback(feedback)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
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
                                    User
                                  </label>
                                  <p className="font-medium text-white">
                                    {selectedFeedback.userNickname}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-400">
                                    Room Code
                                  </label>
                                  <p className="font-mono text-white">
                                    {selectedFeedback.roomCode}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-400">
                                    Rating
                                  </label>
                                  <p className="text-yellow-400">
                                    {getRatingStars(selectedFeedback.rating)}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-400">
                                    Status
                                  </label>
                                  <Badge
                                    className={getStatusColor(
                                      selectedFeedback.status,
                                    )}
                                  >
                                    {selectedFeedback.status}
                                  </Badge>
                                </div>
                              </div>

                              <div>
                                <label className="text-sm font-medium text-gray-400">
                                  Full Message
                                </label>
                                <div className="mt-1 p-3 bg-gray-700 rounded-lg">
                                  <p className="text-white">
                                    {selectedFeedback.fullMessage}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <label className="text-sm font-medium text-gray-400">
                                  Admin Notes
                                </label>
                                <Textarea
                                  placeholder="Add your notes here..."
                                  value={adminNotes}
                                  onChange={(e) =>
                                    setAdminNotes(e.target.value)
                                  }
                                  className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                />
                              </div>

                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                                >
                                  Mark as Reviewed
                                </Button>
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                  Save Notes
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
