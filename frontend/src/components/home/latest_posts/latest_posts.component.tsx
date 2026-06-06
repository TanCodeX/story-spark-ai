import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "../../../models/post";
import { useGetLatestListsQuery } from "../../../redux/apis/post.api";
import LoadingAnimation from "../../loading/loading.component";

const INITIAL_VISIBLE_COUNT = 6;

const LatestPostsComponent = () => {
  const { data, isLoading, isError, refetch } =
    useGetLatestListsQuery(undefined);

  const navigate = useNavigate();

  const [showAllPosts, setShowAllPosts] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  if (isLoading) return <LoadingAnimation />;

  if (isError) {
    return (
      <section className="mb-12 text-slate-100">
        <h2 className="mb-6 text-2xl font-bold">
          Latest Posts
        </h2>

        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-5 text-center text-red-200">
          <p className="mb-3 font-semibold">
            Failed to load latest posts.
          </p>

          <button
            onClick={() => refetch()}
            className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  // Remove duplicate posts
  const seenIds = new Set<string>();

  const uniquePosts = (data?.posts ?? []).filter((post: Post) => {
    if (!post?._id || seenIds.has(post._id)) return false;

    seenIds.add(post._id);

    return true;
  });

  const shouldShowLoadMore =
    uniquePosts.length > INITIAL_VISIBLE_COUNT;

  const visiblePosts =
    showAllPosts || !shouldShowLoadMore
      ? uniquePosts
      : uniquePosts.slice(0, INITIAL_VISIBLE_COUNT);

  const toggleAccordion = (postId: string) => {
    setExpandedPostId((prevId) =>
      prevId === postId ? null : postId
    );
  };

  return (
    <section className="w-full min-w-0 max-w-full text-slate-100">
      <h2 className="mb-6 text-2xl font-bold">
        Latest Posts
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
        {visiblePosts.length > 0 ? (
          visiblePosts.map((post: Post) => {
            const isExpanded =
              expandedPostId === post._id;

            return (
              <div
                key={post._id}
                className="motion-card-subtle story-panel flex h-full flex-col overflow-hidden rounded-2xl border border-slate-700/30 bg-[#252b3d]/40 transition-all duration-200 hover:-translate-y-1 hover:border-cyan-400/30"
              >
                <div
                  onClick={() => toggleAccordion(post._id)}
                  className="w-full cursor-pointer p-5 text-left"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="pr-4 text-lg font-bold text-slate-100 md:text-xl">
                      {post.title}
                    </h3>

                    <span className="shrink-0 text-sm font-mono text-slate-400">
                      {isExpanded ? "▼" : "▶"}
                    </span>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded
                        ? "mt-4 max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="mb-4 whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-400 md:text-base">
                      {post.content ||
                        "No preview content available."}
                    </p>

                    <div className="flex justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          navigate(`/post/${post._id}`);
                        }}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                      >
                        Read Full Story
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-5 text-slate-500 dark:border-slate-800 dark:bg-slate-900/20 dark:text-slate-400">
            Posts are not available.
          </div>
        )}
      </div>

      {shouldShowLoadMore && !showAllPosts && (
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setShowAllPosts(true)}
            className="motion-cta cursor-pointer rounded-lg border border-slate-300/70 bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default LatestPostsComponent;