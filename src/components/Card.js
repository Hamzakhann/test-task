import React from "react";

const Card = ({ item }) => {
  const newHost = new URL(item?.image?.uri).host + "/resize/450";
  const finalImage = item.image.uri.replace(
    new URL(item?.image?.uri).host,
    newHost
  );
  return (
    <div class="w-100 rounded-xl my-1">
      <img
        alt="person capturing"
        src={finalImage}
        class="w-full rounded-t-lg"
      />
      <div class="bg-white shadow-card rounded-b-lg pb-6">
        <div class="p-4">
          <p className="text-secondary font-bold text-sm">WIDEN MY WORLD</p>
          <h2 class="text-xl font-semibold">{item.name}</h2>
          <p className="text-gray_light">
            {item?.experts[0]?.firstName} {item?.experts[0]?.lastName}
          </p>
          <p className="text-gray_light">{item?.experts[0]?.title}</p>
          <p className="text-secondary font-bold text-sm">
            {item?.experts[0]?.company}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
