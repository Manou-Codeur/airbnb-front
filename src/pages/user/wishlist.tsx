import { Loading, PageLayout, PlacesGrid } from "@comps";
import { useEffect, useState } from "react";
import { getPlaces, PlaceModel } from "services/place.service";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlaces().then((data) => {
      const wishs = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlist(data.places.filter((e: PlaceModel) => wishs.includes(e._id)));
      setLoading(false);
    });

    return () => {
      setWishlist([]);
      setLoading(true);
    };
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <PageLayout title="Wishlist">
      <h1 className="text-2xl mb-4 font-semibold">My Wishlist</h1>
      <PlacesGrid places={wishlist} />
    </PageLayout>
  );
}

export default Wishlist;
