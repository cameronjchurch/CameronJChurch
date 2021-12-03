using System.Collections.Generic;

namespace CameronJChurch.Models
{
    public class PerformanceMonitoring
    {
        public PerformanceMonitoring()
        {
            PerformanceMetrics = new List<PerformanceMetric>();
        }
        public ICollection<PerformanceMetric> PerformanceMetrics { get; set; }
    }

    public class PerformanceMetric
    {
        public string Name { get; set; }
        public long Value { get; set; }
    }
}
