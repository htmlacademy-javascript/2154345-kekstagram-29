interface PhotoComment {
	id: number | null,
	avatar: string,
	message: string,
	name: string
}

interface Photo {
	id: number | null,
	url: string,
	description: string,
	likes: number,
	comments: PhotoComment[],
}

interface Comments {
  (): void;
}

export type { Photo, PhotoComment, Comments };
