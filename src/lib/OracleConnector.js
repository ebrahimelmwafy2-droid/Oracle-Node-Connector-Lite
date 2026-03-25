import { useState, useEffect, useCallback } from 'react';

// المكتبة بتستقبل اللينك (endpoint) والـ token للأمان
export const useOracleSync = ({ endpoint, token = "demo-token-123" }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // تعريف الـ fetchOracle جوه الـ useCallback عشان الـ ESLint يشوفها
  const fetchOracle = useCallback(async () => {
    setLoading(true);
    try {
      // لو اللينك تجريبي، هنعرض بياناتنا المحترفة
      if (!endpoint || endpoint.includes('example.com')) {
        const mockData = [
          { id: 1, name: "Oracle DB - Damietta Cluster", status: "Active", lastSync: "Now" },
          { id: 2, name: "Cloud Server - Egypt", status: "Running", lastSync: "2m ago" },
          { id: 3, name: "Main API Gateway", status: "Connected", lastSync: "5m ago" }
        ];
        setTimeout(() => {
          setData(mockData);
          setLoading(false);
        }, 800);
      } else {
        // الربط الحقيقي بـ Oracle Cloud باستخدام الـ Token
        const res = await fetch(endpoint, {
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
          }
        });
        const json = await res.json();
        setData(json.items || json);
        setLoading(false);
      }
    } catch (err) {
      console.error("OCI Connection Error");
      setLoading(false);
    }
  }, [endpoint, token]); // ضفنا الـ token هنا عشان الـ Dependency تبقى صح

  useEffect(() => {
    fetchOracle();
  }, [fetchOracle]);

  // بنرجع الـ refresh وهو نفسه الـ fetchOracle
  return { data, loading, refresh: fetchOracle };
};