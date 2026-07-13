export type DataQuality = "Excellent" | "Good" | "Fair" | "Poor";

export interface DataSourceItemProps {
    id: string;
    label: string;
    coverage: number;
    quality: DataQuality;
}