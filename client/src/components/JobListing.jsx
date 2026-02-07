import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  // ✅ SAFE DEFAULT
  const {
    isSearched,
    searchFilter,
    setSearchFilter,
    jobs = [],
  } = useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  // ✅ NEVER init from jobs
  const [filteredJobs, setFilteredJobs] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((c) => c !== location)
        : [...prev, location]
    );
  };

  useEffect(() => {
    if (!Array.isArray(jobs)) return;

    const matchesCategory = (job) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);

    const matchesLocation = (job) =>
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.location);

    const matchesTitle = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const matchesSearchLocation = (job) =>
      searchFilter.location === "" ||
      job.location
        .toLowerCase()
        .includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchesSearchLocation(job)
      );

    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [jobs, selectedCategories, selectedLocations, searchFilter]);

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-full lg:w-1/4 bg-white px-4">
        {/* Current search */}
        {isSearched &&
          (searchFilter.title || searchFilter.location) && (
            <>
              <h3 className="font-medium text-lg mb-4">
                Current Search
              </h3>
              <div className="mb-4 text-gray-600">
                {searchFilter.title && (
                  <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
                    {searchFilter.title}
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({
                          ...prev,
                          title: "",
                        }))
                      }
                      className="cursor-pointer"
                      src={assets.cross_icon}
                      alt=""
                    />
                  </span>
                )}
                {searchFilter.location && (
                  <span className="ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded">
                    {searchFilter.location}
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({
                          ...prev,
                          location: "",
                        }))
                      }
                      className="cursor-pointer"
                      src={assets.cross_icon}
                      alt=""
                    />
                  </span>
                )}
              </div>
            </>
          )}

        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="px-6 py-1.5 rounded border border-gray-400 lg:hidden"
        >
          {showFilter ? "Close" : "Filters"}
        </button>

        {/* Category filter */}
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4">
            Search by Categories
          </h4>
          <ul className="space-y-4 text-gray-600">
            {JobCategories.map((category, index) => (
              <li
                className="flex gap-3 items-center"
                key={index}
              >
                <input
                  type="checkbox"
                  className="scale-125"
                  checked={selectedCategories.includes(category)}
                  onChange={() =>
                    handleCategoryChange(category)
                  }
                />
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Location filter */}
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4 pt-14">
            Search by Location
          </h4>
          <ul className="space-y-4 text-gray-600">
            {JobLocations.map((location, index) => (
              <li
                className="flex gap-3 items-center"
                key={index}
              >
                <input
                  type="checkbox"
                  className="scale-125"
                  checked={selectedLocations.includes(
                    location
                  )}
                  onChange={() =>
                    handleLocationChange(location)
                  }
                />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* ================= JOB LIST ================= */}
      <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
        <h3
          className="font-medium text-3xl py-2"
          id="job-list"
        >
          Latest jobs
        </h3>
        <p className="mb-8">
          Get your desired job from top companies
        </p>

        {filteredJobs.length === 0 ? (
          <p className="text-gray-500">
            No jobs found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredJobs
              .slice(
                (currentPage - 1) * 6,
                currentPage * 6
              )
              .map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
