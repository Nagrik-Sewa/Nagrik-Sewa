import { useState, useEffect } from 'react';
import { statsApi } from '@/lib/api';

interface PlatformStats {
  totalUsers: number;
  totalCustomers: number;
  totalWorkers: number;
  verifiedWorkers: number;
  totalBookings: number;
  activeDistricts: number;
  completedBookings: number;
}

export function usePlatformStats() {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await statsApi.getPlatformStats();
        setStats(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        // Fallback to default values if API fails
        setStats({
          totalUsers: 50000,
          totalCustomers: 35000,
          totalWorkers: 15000,
          verifiedWorkers: 12000,
          totalBookings: 15000,
          activeDistricts: 640,
          completedBookings: 12000
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
}