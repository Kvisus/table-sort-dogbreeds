import { FC, useState } from "react";

interface TableProps {
  breeds: {
    avgHeight: number;
    avgLifespan: number;
    avgWeight: number;
    id: number;
    isActive: boolean;
    name: string;
    [key: string]: number | boolean | string; // TypeScript will allow using a string to access the properties of the object without the error.
  }[];
}
type SortConfig = {
  column: string | null;
  direction: "asc" | "desc";
};
const Table: FC<TableProps> = ({ breeds }) => {
  const [dogBreeds, setDogBreeds] = useState(breeds);
  const [searchQuery, setSearchQuery] = useState("");

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: null,
    direction: "asc",
  });

  const handleSort = (key: string) => {
    const newSortConfig = { column: key, direction: "asc" } as SortConfig;
    if (sortConfig.column === key && sortConfig.direction === "asc") {
      newSortConfig.direction = "desc";
    }
    setSortConfig(newSortConfig);

    const sortedBreeds = [...breeds].sort((a, b) => {
      if (newSortConfig.direction === "asc") {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    }) as typeof breeds;
    setDogBreeds(sortedBreeds);
  };

  const renderHeader = (key: string) => {
    return (
      <th onClick={() => handleSort(key)} key={key}>
        <div>
          {key} {getHeaderArrow(key)}
        </div>
      </th>
    );
  };

  const getHeaderArrow = (key: string) => {
    if (sortConfig.column !== key) return null;
    if (sortConfig.direction === "asc") return <span>▲</span>;
    if (sortConfig.direction === "desc") return <span>▼</span>;
  };

  // console.log(breeds);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    const newBreeds = breeds.filter((breed) =>
      breed.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setDogBreeds(newBreeds);
  };

  const handleActiveFilter = (payload: string | boolean) => {
    if (payload === "all") {
      setDogBreeds(breeds);
      return;
    }
    const newBreeds = breeds.filter((breed) => breed.isActive === payload);
    setDogBreeds(newBreeds);
  };

  return (
    <>
      <div>
        <div className="flex justify-between">
          <input
            value={searchQuery}
            onChange={handleSearchChange}
            type="text"
            placeholder="Search breeds"
            className="input input-bordered w-full max-w-xs"
          />
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn"
            onClick={() => {
              const modal = document.getElementById(
                "my_modal_2"
              ) as HTMLDialogElement;
              modal.showModal();
            }}
          >
            Select Filter
          </button>
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box h-1/3">
              <h3 className="font-bold text-lg">Select your Filters</h3>
              {/* <h4>Click outside/hit ESC to close</h4> */}
              <div className="">
                <h4>Is breed active?</h4>
                <button
                  onClick={() => handleActiveFilter("all")}
                  className="btn btn-info"
                >
                  Do not Care
                </button>
                <button
                  onClick={() => handleActiveFilter(true)}
                  className="btn btn-success"
                >
                  Yes
                </button>
                <button
                  onClick={() => handleActiveFilter(false)}
                  className="btn btn-error"
                >
                  No
                </button>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                {renderHeader("id")}
                {renderHeader("name")}
                {renderHeader("avgWeight")}
                {renderHeader("avgLifespan")}
                {renderHeader("avgHeight")}
                {renderHeader("isActive")}
              </tr>
            </thead>
            <tbody>
              {dogBreeds.map((breed) => {
                return (
                  <tr key={breed.id}>
                    <td>{breed.id}</td>
                    <td>{breed.name}</td>
                    <td>{breed.avgWeight}</td>
                    <td>{breed.avgLifespan}</td>
                    <td>{breed.avgHeight}</td>
                    <td>{breed.isActive ? "Yes" : "No"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Table;
