import type { QuestionFilters } from "@/integrations/axios/questions/questions.schema";
import { useState, useEffect, useMemo } from "react";

export const useQuestionsFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "normal" | "spicy">(
    "all",
  );
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
  }, [debouncedSearch, typeFilter]);

  // 建立篩選參數（不包含分頁）
  const filterParams = useMemo(() => {
    const query: Omit<QuestionFilters, "page"> = {
      sort_by: "created_at_desc",
    };

    if (debouncedSearch.trim()) {
      query.keyword = debouncedSearch.trim();
    }

    if (typeFilter !== "all") {
      query.level = typeFilter;
    }

    return query;
  }, [debouncedSearch, typeFilter]);

  // 完整的查詢參數（包含分頁）
  const queryParams = useMemo(
    () => ({
      ...filterParams,
      page: currentPage,
    }),
    [filterParams, currentPage],
  );

  const resetFilters = () => {
    setSearchTerm("");
    setTypeFilter("all");
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const hasActiveFilters =
    debouncedSearch.trim() !== "" || typeFilter !== "all";

  return {
    // 篩選狀態
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,

    // 分頁狀態
    currentPage,
    goToPage,

    // 查詢參數
    // filterParams,
    queryParams,

    // 輔助功能
    resetFilters,
    hasActiveFilters,
  };
};
