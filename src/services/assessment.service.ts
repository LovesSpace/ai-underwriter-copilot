import apiClient from "@/api/apiClient";

import type { Assessment } from "@/features/new-assessment/schema/assessmentSchema";

class AssessmentService {

    async assess(
        request: Assessment,
    ): Promise<unknown> {

        try {

            const response = await apiClient.post(
                "/api/v1/assessment",
                request,
            );

            return response.data;

        } catch (error) {

            console.error("Assessment API Error:", error);

            throw error;

        }

    }

}

export default new AssessmentService();