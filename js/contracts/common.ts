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

interface OverlayInput {
  addEventListener(type: 'keyup' | 'keydown', listener: (event: KeyboardEvent) => any, options?: boolean | EventListenerOptions): void;
}

export type { Photo, PhotoComment, OverlayInput };
