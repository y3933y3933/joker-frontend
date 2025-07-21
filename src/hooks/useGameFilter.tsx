import type { AdminGameFilter } from "@/integrations/axios/games/game.schema";
import { useState, useEffect, useMemo } from "react";

export const useGamesFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "waiting" | "playing" | "ended"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // 防抖
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // 當篩選條件改變時，重置到第一頁
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, statusFilter]);

  // 建立篩選參數（不包含分頁）
  const filterParams = useMemo(() => {
    const query: Omit<AdminGameFilter, "page"> = {};

    if (debouncedSearch.trim()) {
      query.code = debouncedSearch.trim();
    }

    if (statusFilter !== "all") {
      query.status = statusFilter;
    }

    return query;
  }, [debouncedSearch, statusFilter]);

  // 完整的查詢參數（包含分頁）
  const queryParams = useMemo(
    () => ({
      ...filterParams,
      page: currentPage,
    }),
    [filterParams, currentPage],
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return {
    // 篩選狀態
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,

    // 分頁狀態
    currentPage,
    goToPage,

    // 查詢參數
    // filterParams,
    queryParams,
  };
};
