import { starService } from "@/services/star.service";
import { useMutation } from "@tanstack/react-query";

export const useCreateOrRemoveStar = () => {
    const { mutateAsync } = useMutation({
        mutationFn: async (blogId: number) => {
            await starService.createOrRemoveStar(blogId);
        }
    })

    return {
        mutateStar: mutateAsync,
    }
};