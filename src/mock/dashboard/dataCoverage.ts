export interface DataSource {
    id: string;
    label: string;
    coverage: number;
    quality: "Excellent" | "Good" | "Fair" | "Poor";
}

export const dataCoverage: DataSource[] = [
    { id: "gst", label: "GST", coverage: 98, quality: "Excellent" },
    { id: "bank", label: "Bank", coverage: 100, quality: "Excellent" },
    { id: "upi", label: "UPI", coverage: 90, quality: "Excellent" },
    { id: "epfo", label: "EPFO", coverage: 85, quality: "Good" },
    { id: "electricity", label: "Electricity", coverage: 95, quality: "Excellent" },
    { id: "fuel", label: "Fuel", coverage: 80, quality: "Good" },
    { id: "purchaseData", label: "Purchase Data", coverage: 75, quality: "Good" },
    { id: "salesData", label: "Sales Data", coverage: 90, quality: "Excellent" },
];