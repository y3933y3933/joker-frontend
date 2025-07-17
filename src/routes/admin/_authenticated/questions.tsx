import AddQuestionModal from "@/components/AddQuestionModal";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import EditQuestionModal from "@/components/EditQuestionModal";
import { Pagination } from "@/components/Pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SelectNative } from "@/components/ui/select-native";
import {
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Table,
} from "@/components/ui/table";
import { useQuestionsFilter } from "@/hooks/useQuestionsFilters";
import { useCreateQuestion } from "@/integrations/tanstack-query/questions/useCreateQuestion";
import { useDeleteQuestion } from "@/integrations/tanstack-query/questions/useDeleteQuestion";
import useGetPaginatedQuestions from "@/integrations/tanstack-query/questions/useGetPaginatedQuestions";
import { useUpdateQuestion } from "@/integrations/tanstack-query/questions/useUpdateQuestion";
import type { Level } from "@/types";
import { createFileRoute } from "@tanstack/react-router";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_authenticated/questions")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    searchTerm,
    setSearchTerm,
    setTypeFilter,
    typeFilter,
    queryParams,
    currentPage,
    goToPage,
  } = useQuestionsFilter();
  const { data } = useGetPaginatedQuestions(queryParams);

  const [addQuestionOpen, setAddQuestionOpen] = useState(false);
  const [editQuestionOpen, setEditQuestionOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState<number | null>(null); // ✅ 記錄具體 ID
  const [editQuestion, setEditQuestion] = useState<{
    id: number;
    level: Level;
    content: string;
  } | null>(null);

  const { mutateAsync: createQuestion } = useCreateQuestion();
  const { mutateAsync: deleteQuestion } = useDeleteQuestion();
  const { mutateAsync: updateQuestion } = useUpdateQuestion();

  const getTypeColor = (type: string) => {
    switch (type) {
      case "normal":
        return "bg-green-900 text-green-300 border-green-700";
      case "spicy":
        return "bg-purple-900 text-purple-300 border-purple-700";
      default:
        return "bg-gray-700 text-gray-300 border-gray-600";
    }
  };

  const handleDelete = async (id: number | null) => {
    if (id === null) return;
    try {
      await deleteQuestion(id);
      toast.success("刪除問題成功");
    } catch (error) {
      console.error(error);
      toast.error("刪除問題失敗");
    } finally {
      setDeleteConfirmOpen(false);
      setDeleteQuestionId(null);
    }
  };

  const handleEdit = async (question: {
    id: number;
    content: string;
    level: Level;
  }) => {
    try {
      await updateQuestion(question);
      toast.success("更新問題成功");
      setEditQuestionOpen(false);
      setEditQuestion(null);
    } catch (error) {
      console.error(error);
      toast.error("更新問題失敗");
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-900 ">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Questions Management</h1>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setAddQuestionOpen(!addQuestionOpen)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Question
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <SelectNative
              id="type-filter"
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value as "all" | "normal" | "spicy")
              }
              className="w-full sm:w-48 bg-gray-700 border-gray-600 text-white"
            >
              <option value="all">all</option>
              <option value="normal">normal</option>
              <option value="spicy">spicy</option>
            </SelectNative>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Question Text</TableHead>
                  <TableHead className="text-gray-300">Type</TableHead>
                  <TableHead className="text-gray-300">Created At</TableHead>
                  <TableHead className="text-right text-gray-300">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.questions.map((question) => (
                  <TableRow
                    key={question.id}
                    className="border-gray-700 hover:bg-gray-700/50"
                  >
                    <TableCell className="max-w-md text-white">
                      <p className="truncate">{question.content}</p>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(question.level)}>
                        {question.level}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {question.createdAt}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                          onClick={() => {
                            setEditQuestion(question);
                            setEditQuestionOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-red-400 hover:bg-gray-700 hover:text-red-300 bg-transparent"
                          onClick={() => {
                            setDeleteQuestionId(question.id);
                            setDeleteConfirmOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

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

      <AddQuestionModal
        isOpen={addQuestionOpen}
        onClose={() => {
          setAddQuestionOpen(false);
        }}
        onAdd={async (question) => {
          await createQuestion({
            level: question.type,
            content: question.text,
          });
        }}
      />

      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={() => handleDelete(deleteQuestionId)}
        title="確定要刪除這筆資料？"
      />

      {editQuestion && (
        <EditQuestionModal
          isOpen={editQuestionOpen}
          onClose={() => {
            setEditQuestionOpen(false);
          }}
          onEdit={handleEdit}
          question={editQuestion}
        />
      )}
    </div>
  );
}
