import AppCard from "@/components/shared/AppCard";
import WaterfallChart from "./WaterfallChart";

interface ScoreExplanationCardProps {
    totalScore: number;
    componentScores: any[];
}

const ScoreExplanationCard = ({
    totalScore,
    componentScores
    ,
}: ScoreExplanationCardProps) => {

    return (
        <AppCard className="mt-4 p-4">
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2
                        className="text-base font-bold text-slate-800"
                        style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}
                    >
                        Why Financial Health Score is {totalScore}?
                    </h2>

                </div>
            </div>

            <WaterfallChart
                totalScore={totalScore}
                componentScores={componentScores}
            />
        </AppCard>
    );
};

export default ScoreExplanationCard;