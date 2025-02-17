import { useState, useEffect } from "react";

export default function useImages(directory) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch(`/api/images?directory=${directory}`);
        if (!response.ok) throw new Error("Failed to fetch images");

        const data = await response.json();
        setImages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [directory]);

  return { images, loading, error };
}
