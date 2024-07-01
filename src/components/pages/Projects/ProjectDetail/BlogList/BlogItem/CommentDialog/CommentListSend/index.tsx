import { useStore } from '@/components/providers/StoreProvider'
import React, { useEffect, useState } from 'react'
import { Comment } from '@/types'
import CommentItemSocket from '../CommentItemSocket'

const CommentListWhileACommnetSend = ({ blogId }: { blogId: number }) => {
    const socket = useStore((state) => state.socket)
    const [commentList, setCommentList] = useState<Comment[]>([])
    useEffect(() => {
        socket.on(`comment/${blogId}`, (data: Comment) => {
            setCommentList((prev) => {
                return [data, ...prev]
            })
        })

        return () => {
            socket.off(`comment/${blogId}`)
        }
    }, [])
    return (
        <div className="space-y-2">
            {commentList?.map((comment) => {
                return <CommentItemSocket comment={comment} key={comment.id} />
            })}
        </div>
    )
}

export default CommentListWhileACommnetSend
