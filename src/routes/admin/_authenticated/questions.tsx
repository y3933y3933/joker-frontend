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
import { createFileRoute } from "@tanstack/react-router";
import { Edit, Filter, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const questions = [
  {
    id: 1,
    text: "What's your favorite childhood memory?",
    type: "icebreaker",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    text: "If you could have dinner with anyone, who would it be?",
    type: "general",
    createdAt: "2024-01-14",
  },
  {
    id: 3,
    text: "What's the most adventurous thing you've ever done?",
    type: "personal",
    createdAt: "2024-01-13",
  },
  {
    id: 4,
    text: "What's your biggest fear?",
    type: "deep",
    createdAt: "2024-01-12",
  },
  {
    id: 5,
    text: "If you could live anywhere in the world, where would it be?",
    type: "general",
    createdAt: "2024-01-11",
  },
];

export const Route = createFileRoute("/admin/_authenticated/questions")({
  component: RouteComponent,
});

function RouteComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = question.text
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || question.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Add pagination logic after filteredQuestions
  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuestions = filteredQuestions.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, typeFilter]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "icebreaker":
        return "bg-blue-900 text-blue-300 border-blue-700";
      case "general":
        return "bg-green-900 text-green-300 border-green-700";
      case "personal":
        return "bg-purple-900 text-purple-300 border-purple-700";
      case "deep":
        return "bg-orange-900 text-orange-300 border-orange-700";
      default:
        return "bg-gray-700 text-gray-300 border-gray-600";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-900 ">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Questions Management</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
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
              onChange={(e) => setTypeFilter(e.target.value)}
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
                {paginatedQuestions.map((question) => (
                  <TableRow
                    key={question.id}
                    className="border-gray-700 hover:bg-gray-700/50"
                  >
                    <TableCell className="max-w-md text-white">
                      <p className="truncate">{question.text}</p>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(question.type)}>
                        {question.type}
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
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-red-400 hover:bg-gray-700 hover:text-red-300 bg-transparent"
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
          {/* {totalPages > 1 && (
            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )} */}
        </CardContent>
      </Card>
    </div>
  );
}
