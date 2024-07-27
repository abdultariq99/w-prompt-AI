'use client'

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

export const Feed = () => {
  return (
    <section className="feed">
      <form className='relative w-full flex-center'>
        <input
        type="text
        placeholder='Search for a tag or a username"
        value={searchText}
        onChange={handleSearchChange}
        required
        />
      </form>
    </section>
  )
}
