import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Distributor {
  id: number;
  name: string;
  lastMonthQty: number;
  forecastQty: number;
  ytdAvgQty: number;
}

export default function Dashboard() {
  const [distributors, setDistributors] = useState<Distributor[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/mockDistributors.json")
      .then((res) => res.json())
      .then(setDistributors);
  }, []);

  const filtered = distributors.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Augur Dashboard</h1>
      <Input
        placeholder="Search distributors..."
        className="mb-6 w-full max-w-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((dist) => (
          <Card key={dist.id} className="shadow-xl border rounded-2xl">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">{dist.name}</h2>
              <p>📦 Last Month: {dist.lastMonthQty.toLocaleString()}</p>
              <p>🔮 Forecast: {dist.forecastQty.toLocaleString()}</p>
              <p>📈 YTD Avg: {dist.ytdAvgQty.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-2">
                Change: {((dist.forecastQty - dist.lastMonthQty) / dist.lastMonthQty * 100).toFixed(1)}%
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
