"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import Loading from "@app/profile/loading";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [reloadCount, setReloadCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const response = await fetch("/api/prompt");
      if (!response.ok) throw new Error("Failed to fetch posts.");
      const data = await response.json();
      setAllPosts(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setHasError(true);
      setReloadCount(reloadCount + 1);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hasError && reloadCount < 3) {
      // Reload the screen to redo the fetch
      window.location.reload();
    }
  }, [hasError, reloadCount]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return allPosts.filter((item) =>
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  if (isLoading) {
    return (
      <div className="pt-[8%]">
        <Loading />
        <p className="font-bold orange_gradient">Loading Prompts...</p>
      </div>
    );
  }

  if (hasError && reloadCount >= 3) {
    return (
      <div className="pt-[8%]">
        <p className="font-bold orange_gradient">Error fetching posts. Please try again later.</p>
      </div>
    );
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username or a prompt"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;