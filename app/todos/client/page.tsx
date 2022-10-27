"use client"

import React, { Suspense, use } from "react"
import { PostType } from "../../../src/interface/PostType"
import styles from "../../page.module.css"
import axios from "axios"
import useSWR from "swr"

const onGetPosts = async () => {
  const response = await axios.get<PostType[] | undefined>(
    "https://jsonplaceholder.typicode.com/posts"
  )

  return response.data
}

function Client() {
  const { data: post, error } = useSWR("/post", onGetPosts)

  return (
    <Suspense fallback={<p>Loading..</p>}>
      <div className={styles.container}>
        <ul>
          {post
            ? post.map((item) => <div key={item.title}>{item.title}</div>)
            : null}
        </ul>
      </div>
    </Suspense>
  )
}

export default Client
