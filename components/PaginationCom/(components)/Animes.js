import Image from 'next/image'
import Link from 'next/link'
import PaginationForAll from './Pagination'

const Animes = ({animeLink, animeList, handlePageChange, page, totalPages}) => {
  return (
    <div className="flex items-center justify-center flex-col padding w-screen">
      <div className="grid max-sm:grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-6 w-full h-full">
        {animeList?.map((anime) => (
          <Link
            href={`${animeLink}/${anime.mal_id}`}
            key={anime.mal_id}
            className="flex items-center justify-center flex-col mb-4"
          >
            <Image
              src={anime.images.jpg.image_url}
              width={1200}
              height={1200}
              className="w-full h-full  object-cover "
              alt={anime.title_english || anime.title}
            />

            <h2 className="mt-2 truncate w-36 text-center">
              {anime.title_english || anime.title}
            </h2>
          </Link>
        ))}
      </div>
      <PaginationForAll handlePageChange={handlePageChange} page={page} totalPages={totalPages} />
    </div>
  )
}

export default Animes