import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { createComment, getComments } from '../services/comments'
import { CommentWithId } from '../models'

export function useComments () {
  const { data: comments, isLoading, error } = useQuery<CommentWithId[]>({
    queryKey: ['comments'],
    queryFn: getComments
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading: isLoadingMutation } = useMutation({
    mutationFn: createComment,
    onMutate: async (newComment) => {
      await queryClient.cancelQueries(['comments'])

      // esto lo hacemos para guardar el estado previo
      // por si tenemos que hacer un rollback
      const previousComments = queryClient.getQueryData(['comments'])

      queryClient.setQueryData(['comments'], (oldData?: Comment[]): Comment[] => {
        const newCommentToAdd = structuredClone(newComment)
        newCommentToAdd.preview = true

        if (oldData == null) return [newCommentToAdd]
        return [...oldData, newCommentToAdd]
      })

      return { previousComments } // -----> context
    },
    onError: (error, variables, context) => {
      console.error(error)
      if (context?.previousComments != null) {
        queryClient.setQueryData(['comments'], context.previousComments)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['comments']
      })
    }
  })

  return {
    comments,
    error,
    isLoading,
    isLoadingMutation,
    mutate
  }
}
