import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Pagination } from "@/components/Pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { useGamesFilter } from "@/hooks/useGameFilter";
import type { AdminGame } from "@/integrations/axios/games/game.schema";
import useEndGameByAdmin from "@/integrations/tanstack-query/games/useEndGameByAdmin";
import useGetPaginatedGames from "@/integrations/tanstack-query/games/useGetPaginatedGames";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Filter, Eye, Square } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_authenticated/game-rooms")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    goToPage,
    queryParams,
  } = useGamesFilter();

  const { mutateAsync: endGame, isLoading: endGameLoading } =
    useEndGameByAdmin();
  const { data } = useGetPaginatedGames(queryParams);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const [selectedGame, setSelectedGame] = useState<AdminGame | null>(null);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "playing":
        return "bg-green-900 text-green-300 border-green-700";
      case "waiting":
        return "bg-yellow-900 text-yellow-300 border-yellow-700";
      case "ended":
        return "bg-gray-700 text-gray-300 border-gray-600";
      default:
        return "bg-gray-700 text-gray-300 border-gray-600";
    }
  };

  const handleTerminateGame = async (gameCode: string) => {
    if (endGameLoading) return;

    try {
      await endGame({ code: gameCode });
      toast.success("遊戲已結束");
    } catch (error) {
      console.error("結束遊戲失敗", error);
      toast.error("結束遊戲失敗");
    } finally {
      setDeleteConfirmOpen(false);
      setSelectedGame(null);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Game Rooms Management</h1>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by room code"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={(v: "all" | "waiting" | "playing" | "ended") =>
                setStatusFilter(v)
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
                  value="waiting"
                  className="text-white hover:bg-gray-600"
                >
                  Waiting
                </SelectItem>
                <SelectItem
                  value="playing"
                  className="text-white hover:bg-gray-600"
                >
                  Playing
                </SelectItem>
                <SelectItem
                  value="ended"
                  className="text-white hover:bg-gray-600"
                >
                  Ended
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
                  <TableHead className="text-gray-300">Room Code</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Players</TableHead>
                  <TableHead className="text-gray-300">Created At</TableHead>
                  <TableHead className="text-right text-gray-300">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data &&
                  data.games.map((room) => (
                    <TableRow
                      key={room.id}
                      className="border-gray-700 hover:bg-gray-700/50"
                    >
                      <TableCell className="font-mono font-medium text-white">
                        {room.code}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(room.status)}>
                          {room.status}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-gray-300">
                        {room.playerCount}/8
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {room.createdAt}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-red-400 hover:bg-gray-700 hover:text-red-300 bg-transparent"
                            disabled={room.status === "ended"}
                            onClick={() => {
                              setSelectedGame(room);
                              setDeleteConfirmOpen(true);
                            }}
                          >
                            <Square className="h-4 w-4 mr-1" />
                            Terminate
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={() => {
          if (!selectedGame) {
            return;
          }
          handleTerminateGame(selectedGame.code);
        }}
        title="確定要結束這個房間？"
      />
      {data && data.totalCount !== undefined && data.totalCount > 0 && (
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={data.lastPage || 1}
            onPageChange={goToPage}
          />
        </div>
      )}
    </div>
  );
}
