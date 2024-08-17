"use client";

import { getGenerator } from "@/components/ui/draggables/generators";
import { ApiResponse, Portfolio } from "@/types";
import { useEffect, useState } from "react";

export default function PublishedPage({ params }: { params: { id: number } }) {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

  useEffect(() => {
    fetch(`/api/portfolio/get?portfolioId=${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        if (data.result === "success" && data.content && !Array.isArray(data.content)) {
          setPortfolio({
            description: data.content.description,
            content: data.content.content,
          });
          console.log("fetched portfolio", data.content);
        } else {
          // window.location.replace("/404");
        }
      });
  }, [params.id]);

  return portfolio ? (
    portfolio.content.map((block, index) => (
      <div key={index} className="w-full flex justify-between items-center relative p-6">
        <div className="w-full flex flex-col items-center">{getGenerator(block.id)(block.props)}</div>
      </div>
    ))
  ) : (
    <div>Loading... (id: {params.id})</div>
  );
}
