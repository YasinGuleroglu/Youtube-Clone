import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../../contants";
const Sidebar = ({ selectedCategory }) => {
  return (
    <aside>
      {categories.map((i, index) => (
        <Link to={`/?category=${i.path}`} key={index}>
          <div
            className={`flex items-center gap-2 py-4 px-2 md:px-3 md:text-lg cursor-pointer rounded hover:bg-[#2d2d2d] 
             ${
               (i.path === selectedCategory ||
                 (i.path === "/" && !selectedCategory)) &&
               "bg-[#242424]"
             } `}
          >
            <span className="max-md:text-2xl">{i.icon}</span>
            <span className="max-md:hidden">{i.name}</span>
          </div>

          {i.divider && <hr />}
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
