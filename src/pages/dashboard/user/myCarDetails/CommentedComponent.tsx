const CommentedComponent = () => {
  return (
    <div>
      {/* <li className="flex items-end justify-between">
            <div>
              {open === "brand" ? (
                <div className="space-y-2">
                  <div className="flex flex-col ">
                    <label>Brand</label>
                    <select
                      onChange={(e) => {
                        const value = e.target.value;
                        setCardata({ ...carData, brand: value as TCarBrand });
                        dispatch(setBrand(value as TCarBrand));
                      }}
                      className="peer px-2 py-1 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                    >
                      <option value={carData?.brand}>{carData?.brand}</option>
                      {carBrands
                        .slice()
                        .sort((a, b) => a.localeCompare(b))
                        .map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-10">
                    <button
                      onClick={() => {
                        setOpen("");
                        setCardata(car);
                        dispatch(resetBasicInfo());
                      }}
                      className="text-secondary font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="text-secondary font-semibold"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p>
                  <strong>Brand:</strong> {car?.brand}
                </p>
              )}
            </div>
            {open !== "brand" && (
              <button
                onClick={() => {
                  setOpen("brand");
                  dispatch(resetBasicInfo());
                }}
                className="text-red-600 text-lg "
              >
                <MdEdit />
              </button>
            )}
          </li> */}

      {/* <li className="flex items-end justify-between">
                      <div>
                        {open === "model" ? (
                          <div className="space-y-2">
                            <div className="flex flex-col ">
                              <label>Model</label>
                              <input
                                type="text"
                                value={carData?.model}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  dispatch(setModel(value));
                                  setCardata({ ...carData, model: value });
                                }}
                                className="peer px-2 py-1 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                              />
                            </div>
          
                            <div className="flex items-center gap-10">
                              <button
                                onClick={() => {
                                  setOpen("");
                                  setCardata(car);
                                  dispatch(resetBasicInfo());
                                }}
                                className="text-secondary font-semibold"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleSubmit}
                                className="text-secondary font-semibold"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p>
                            <strong>Model:</strong> {car?.model}
                          </p>
                        )}
                      </div>
                      {open !== "model" && (
                        <button
                          onClick={() => {
                            setOpen("model");
                            dispatch(resetBasicInfo());
                          }}
                          className="text-red-600 text-lg "
                        >
                          <MdEdit />
                        </button>
                      )}
                    </li> */}

      {/* <li className="flex items-end justify-between">
            <div>
              {open === "category" ? (
                <div className="space-y-2">
                  <div className="flex flex-col ">
                    <label>Category</label>
                    <select
                      onChange={(e) => {
                        const value = e.target.value;
                        setCardata({
                          ...carData,
                          category: value as TCategory,
                        });
                        dispatch(setCategory(value as TCategory));
                      }}
                      className="peer px-2 py-1 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                    >
                      <option value={carData?.category}>
                        {carData?.category}
                      </option>
                      {carBrands
                        .slice()
                        .sort((a, b) => a.localeCompare(b))
                        .map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-10">
                    <button
                      onClick={() => {
                        setOpen("");
                        setCardata(car);
                        dispatch(resetBasicInfo());
                      }}
                      className="text-secondary font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="text-secondary font-semibold"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p>
                  <strong>Category:</strong> {car?.category}
                </p>
              )}
            </div>
            {open !== "category" && (
              <button
                onClick={() => {
                  setOpen("category");
                  dispatch(resetBasicInfo());
                }}
                className="text-red-600 text-lg "
              >
                <MdEdit />
              </button>
            )}
          </li> */}

      {/* <li className="flex items-end justify-between">
            <div>
              {open === "year" ? (
                <div className="space-y-2">
                  <div className="flex flex-col ">
                    <label>Year</label>
                    <select
                      onChange={(e) => {
                        const value = e.target.value;
                        setCardata({ ...carData, year: value });
                        dispatch(setYear(value));
                      }}
                      className="peer px-2 py-1 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                    >
                      <option value={carData?.year}>{carData?.year}</option>
                      {years.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-10">
                    <button
                      onClick={() => {
                        setOpen("");
                        setCardata(car);
                        dispatch(resetBasicInfo());
                      }}
                      className="text-secondary font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="text-secondary font-semibold"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p>
                  <strong>Year:</strong> {car?.year}
                </p>
              )}
            </div>
            {open !== "year" && (
              <button
                onClick={() => {
                  setOpen("year");
                  dispatch(resetBasicInfo());
                }}
                className="text-red-600 text-lg "
              >
                <MdEdit />
              </button>
            )}
          </li> */}

      {/* <li className="flex items-end justify-between">
            <div>
              {open === "condition" ? (
                <div className="space-y-2">
                  <div className="flex flex-col ">
                    <label>Condition</label>
                    <select
                      onChange={(e) => {
                        const value = e.target.value;
                        setCardata({
                          ...carData,
                          condition: value as TCondition,
                        });
                        dispatch(setCondition(value as TCondition));
                      }}
                      className="peer px-2 py-1 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                    >
                      <option value={carData?.condition}>
                        {carData?.condition}
                      </option>
                      {conditions.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-10">
                    <button
                      onClick={() => {
                        setOpen("");
                        setCardata(car);
                        dispatch(resetBasicInfo());
                      }}
                      className="text-secondary font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="text-secondary font-semibold"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p>
                  <strong>Condition:</strong> {car?.condition}
                </p>
              )}
            </div>
            {open !== "condition" && (
              <button
                onClick={() => {
                  setOpen("condition");
                  dispatch(resetBasicInfo());
                }}
                className="text-red-600 text-lg "
              >
                <MdEdit />
              </button>
            )}
          </li> */}
      {/* <li className="flex items-end justify-between">
        <div>
          {open === "color" ? (
            <div className="space-y-2">
              <div className="flex flex-col ">
                <label>Color</label>
                <select
                  onChange={(e) => {
                    const value = e.target.value;
                    setCardata({
                      ...carData,
                      color: value,
                    });
                    dispatch(setColor(value));
                  }}
                  className="peer px-2 py-1 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                >
                  <option value={carData?.color}>{carData?.color}</option>
                  {carColors.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-10">
                <button
                  onClick={() => {
                    setOpen("");
                    setCardata(car);
                    dispatch(resetBasicInfo());
                  }}
                  className="text-secondary font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="text-secondary font-semibold"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <p>
              <strong>Color:</strong> {car?.color}
            </p>
          )}
        </div>
        {open !== "color" && (
          <button
            onClick={() => {
              setOpen("color");
              dispatch(resetBasicInfo());
            }}
            className="text-red-600 text-lg "
          >
            <MdEdit />
          </button>
        )}
      </li> */}

      {/* <li className="flex items-end justify-between">
            <div>
              {open === "seating" ? (
                <div className="space-y-2">
                  <div className="flex flex-col ">
                    <label>Seating Capacity</label>
                    <select
                      onChange={(e) => {
                        const value = e.target.value;
                        setCardata({
                          ...carData,
                          seatingCapacity: value as TSeatingCapacity,
                        });
                        dispatch(setSeatingCapacity(value as TSeatingCapacity));
                      }}
                      className="peer px-2 py-1 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                    >
                      <option value={carData?.seatingCapacity}>
                        {carData?.seatingCapacity}
                      </option>
                      {seatingCapacies.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-10">
                    <button
                      onClick={() => {
                        setOpen("");
                        setCardata(car);
                        dispatch(resetBasicInfo());
                      }}
                      className="text-secondary font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="text-secondary font-semibold"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p>
                  <strong>Seating Capacity:</strong> {car?.seatingCapacity}
                </p>
              )}
            </div>
            {open !== "seating" && (
              <button
                onClick={() => {
                  setOpen("seating");
                  dispatch(resetBasicInfo());
                }}
                className="text-red-600 text-lg "
              >
                <MdEdit />
              </button>
            )}
          </li> */}

      {/* <li className="flex items-end justify-between">
            <div>
              {open === "madeIn" ? (
                <div className="space-y-2">
                  <div className="flex flex-col ">
                    <label>Made in</label>
                    <select
                      onChange={(e) => {
                        const value = e.target.value;
                        setCardata({
                          ...carData,
                          madeIn: value,
                        });
                        dispatch(setMadeIn(value));
                      }}
                      className="peer px-2 py-1 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                    >
                      <option value={carData?.madeIn}>{carData?.madeIn}</option>
                      {countries.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-10">
                    <button
                      onClick={() => {
                        setOpen("");
                        setCardata(car);
                        dispatch(resetBasicInfo());
                      }}
                      className="text-secondary font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="text-secondary font-semibold"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p>
                  <strong>Made In:</strong> {car?.madeIn}
                </p>
              )}
            </div>
            {open !== "madeIn" && (
              <button
                onClick={() => {
                  setOpen("madeIn");
                  dispatch(resetBasicInfo());
                }}
                className="text-red-600 text-lg "
              >
                <MdEdit />
              </button>
            )}
          </li> */}

      {/* <li className="flex items-end justify-between">
            <div>
              {open === "negotiable" ? (
                <div className="space-y-2">
                  <div className="flex flex-col ">
                    <label>Negotiable</label>
                    <select
                      value={carData?.negotiable ? "Yes" : "No"}
                      onChange={(e) => {
                        const value = e.target.value === "Yes";
                        setCardata({
                          ...carData,
                          negotiable: value,
                        });
                        dispatch(setNegotiable(value));
                      }}
                      className="peer px-2 py-1 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                    >
                      {["Yes", "No"].map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-10">
                    <button
                      onClick={() => {
                        setOpen("");
                        setCardata(car);
                        dispatch(resetBasicInfo());
                      }}
                      className="text-secondary font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="text-secondary font-semibold"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p>
                  <strong>Negotiable:</strong> {car?.negotiable ? "Yes" : "No"}
                </p>
              )}
            </div>
            {open !== "negotiable" && (
              <button
                onClick={() => {
                  setOpen("negotiable");
                  dispatch(resetBasicInfo());
                }}
                className="text-red-600 text-lg "
              >
                <MdEdit />
              </button>
            )}
          </li> */}
      {/* <li className="flex items-end justify-between">
            <div>
              {open === "inStock" ? (
                <div className="space-y-2">
                  <div className="flex flex-col ">
                    <label>In Stock</label>
                    <select
                      value={carData?.inStock ? "Yes" : "No"}
                      onChange={(e) => {
                        const value = e.target.value === "Yes";
                        setCardata({
                          ...carData,
                          inStock: value,
                        });
                        dispatch(setInStock(value));
                      }}
                      className="peer px-2 py-1 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                    >
                      {["Yes", "No"].map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-10">
                    <button
                      onClick={() => {
                        setOpen("");
                        setCardata(car);
                        dispatch(resetBasicInfo());
                      }}
                      className="text-secondary font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="text-secondary font-semibold"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p>
                  <strong>In Stock:</strong> {car?.inStock ? "Yes" : "No"}
                </p>
              )}
            </div>
            {open !== "inStock" && (
              <button
                onClick={() => {
                  setOpen("inStock");
                  dispatch(resetBasicInfo());
                }}
                className="text-red-600 text-lg "
              >
                <MdEdit />
              </button>
            )}
          </li> */}
      {/* <li className="flex items-end justify-between">
            <div>
              {open === "price" ? (
                <div className="space-y-2">
                  <div className="flex flex-col ">
                    <label>Price</label>
                    <input
                      type="number"
                      value={carData?.price}
                      onChange={(e) => {
                        const value = e.target.value;
                        dispatch(setPrice(Number(value)));
                        setCardata({ ...carData, price: Number(value) });
                      }}
                      className="peer px-2 py-1 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                    />
                  </div>

                  <div className="flex items-center gap-10">
                    <button
                      onClick={() => {
                        setOpen("");
                        setCardata(car);
                        dispatch(resetBasicInfo());
                      }}
                      className="text-secondary font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="text-secondary font-semibold"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p>
                  <strong>Price:</strong> {car?.price}
                </p>
              )}
            </div>
            {open !== "price" && (
              <button
                onClick={() => {
                  setOpen("price");
                  dispatch(resetBasicInfo());
                }}
                className="text-red-600 text-lg "
              >
                <MdEdit />
              </button>
            )}
          </li> */}
    </div>
  );
};

export default CommentedComponent;
