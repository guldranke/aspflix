import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CgDanger } from "react-icons/cg";
import Style from "../styles/Movie.module.scss";

const IMAGE_URL = "https://image.tmdb.org/t/p/original";

interface MovieProps {
  title: string;
  poster: string;
  overview: string;
  vote_average: number;
  release_date: string;
  backdrop: string;
  adult: boolean;
}

const Movie = ({
  title,
  poster,
  overview,
  vote_average,
  release_date,
  backdrop,
  adult,
}: MovieProps) => {
  const [displayModal, displayModalSet] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const movieRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (displayModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "initial";
    }
  }, [displayModal]);

  useEffect(() => {
    // Check if theres a click outside the target
    const handleClickOutside = (event: any) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        movieRef.current &&
        !movieRef.current.contains(event.target)
      ) {
        displayModalSet(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <>
      <div
        className={Style.movie}
        onClick={() => displayModalSet(true)}
        ref={movieRef}
      >
        <Image
          alt={title + " poster"}
          width={300}
          height={450}
          src={IMAGE_URL + poster}
        ></Image>
      </div>
      {displayModal && (
        <div className={Style.modal}>
          <div
            ref={modalRef}
            className={Style.modal__content}
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${
                IMAGE_URL + backdrop
              })`,
            }}
          >
            <strong className={Style.content__title}>{title}</strong>
            <small className={Style.content__date}>{release_date}</small>

            <p className={Style.content__adult}>
              {adult && (
                <>
                  Adult <CgDanger />
                </>
              )}
            </p>
            <p className={Style.content__rating}>
              Rating: <span>{vote_average}</span>
            </p>
            <p className={Style.content__overview}>{overview}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Movie;
