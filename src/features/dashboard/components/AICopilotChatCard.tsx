import { useState } from "react";
import { Bot } from "lucide-react";

import AppCard from "@/components/shared/AppCard";
import { suggestedPrompts } from "@/mock/dashboard/aiCopilot";

import SuggestedPromptChip from "./SuggestedPromptChip";
import CopilotChatInput from "./CopilotChatInput";

const FONT_FAMILY = "'Inter', -apple-system, sans-serif";

const AICopilotChatCard = () => {

    const [input, setInput] = useState("");

    const handlePromptClick = (label: string) => {
        setInput(label);
    };

    const handleSend = () => {
        if (!input.trim()) return;

        // TODO: wire to actual copilot response handling
        console.log("Sending message:", input);

        setInput("");
    };

    return (
        <AppCard className="mt-4 p-4">

            <div className="mb-4 flex items-center justify-between">

                <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-blue-600" />

                    <h2
                        className="text-base font-bold text-slate-800"
                        style={{ fontFamily: FONT_FAMILY }}
                    >
                        AI Copilot Chat
                    </h2>
                </div>

                <button
                    type="button"
                    className="text-sm font-medium text-blue-600 hover:underline"
                >
                    New Chat
                </button>

            </div>

            <div className="mb-4 grid grid-cols-2 gap-2">

                {suggestedPrompts.map((prompt) => (
                    <SuggestedPromptChip
                        key={prompt.id}
                        label={prompt.label}
                        onClick={handlePromptClick}
                    />
                ))}

            </div>

            <CopilotChatInput
                value={input}
                onChange={setInput}
                onSend={handleSend}
            />

            <p className="mt-3 text-center text-[9px] text-slate-400">
                AI responses may not be 100% accurate. Please use judgment.
            </p>

        </AppCard>
    );
};

export default AICopilotChatCard;