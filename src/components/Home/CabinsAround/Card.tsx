import type { Cabin } from "../../../types/Cabin";

const Card = ({ data }: { data: Cabin }) => {
  const href = `/todocabanas/cabanas/${data.id}`;

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    window.location.href = href;
  };

  return (
    <div className="group h-[24rem] bg-red rounded-lg shadow-md overflow-hidden duration-[0.3s] ease-in-out   cursor-pointer">
      <a key={data.id} href={href} className="group-hover:scale-[1.02]"> 
        <img
          src={data.images[0]?.thumbnails.large.url}
          alt={data.name}
          className="w-full h-60 object-cover object-center"
        />
        <div className="p-4 bg-white group-hover:bg-primary-light">
          <h2 className="text-xl font-semibold text-primary">{data.name}</h2>
          <p className="text-sm text-t-secondary mt-2">{data.description}</p>
          <button
            onClick={handleButtonClick}
            className="mt-4 !bg-primary !border-none text-secondary px-4 font-bold py-2 duration-[0.3s] ease-in-out rounded-md group-hover:!bg-primary-hover group-hover:!text-white"
          >
            Ver detalles
          </button>
        </div>
      </a>
    </div>
  );
};

export default Card;
