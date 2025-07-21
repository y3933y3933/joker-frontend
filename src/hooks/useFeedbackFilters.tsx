import type { FeedbackFilters } from "@/integrations/axios/feedback/feedback.schema";
import { useState, useEffect, useMemo } from "react";

export const useFeedbackFilter = () => {
  const [reviewStatus, setReviewStatus] = useState<"all" | "new" | "reviewed">(
    "all",
  );
  const [type, setType] = useState<"all" | "feature" | "issue" | "other">(
    "all",
  );
  const [currentPage, setCurrentPage] = useState(1);

  // 當篩選條件改變時，重置到第一頁
  useEffect(() => {
    setCurrentPage(1);
  }, [reviewStatus, type]);

  // 建立篩選參數（不包含分頁）
  const filterParams = useMemo(() => {
    let query: FeedbackFilters = {};

    if (type !== "all") {
      query.type = type;
    }

    if (reviewStatus !== "all") {
      query.reviewStatus = reviewStatus;
    }

    return query;
  }, [type, reviewStatus]);

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
    reviewStatus,
    setReviewStatus,
    type,
    setType,
    // 分頁狀態
    currentPage,
    goToPage,

    // 查詢參數

    queryParams,
  };
};
