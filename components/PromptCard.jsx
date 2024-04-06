"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className='prompt_card_new'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-blue-200'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-xs text-black'>
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className='copy_btn_new' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={15}
            height={15}
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-200'>{post.prompt}</p>
      <p
        className='font-inter text-sm text-orange-500 cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-600 pt-3'>
          <button
            // className='font-inter text-sm green_gradient cursor-pointer'
            className='text-yellow-500 font-inter text-sm hover:text-yellow-400 cursor-pointer rounded px-3'
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            // className='font-inter text-sm orange_gradient cursor-pointer'
            className='text-red-400 font-inter text-sm hover:text-red-300 cursor-pointer px-3 rounded'
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
