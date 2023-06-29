import { Box } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Container from "../components/common/Container";

import uiConfigs from "../configs/ui.configs";
import tmdbConfigs from "../api/configs/tmdb.configs";
import mediaApi from "../api/modules/media.api";
import { routesGen } from "../routes/routes";

import { setGlobalLoading } from "../redux/features/globalLoadingSlice";

import MediaVideosSlide from "../components/common/MediaVideosSlide";
import RecommendSlide from "../components/common/RecommendSlide";
import MediaSlide from "../components/common/MediaSlide";
import MediaReview from "../components/common/MediaReview";

const MediaWatch = () => {
  const { mediaType, mediaId } = useParams();

  const [media, setMedia] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [genres, setGenres] = useState([]);

  const dispatch = useDispatch();

  const videoRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getMedia = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await mediaApi.getDetail({ mediaType, mediaId });
      dispatch(setGlobalLoading(false));

      if (response) {
        setMedia(response);
        setIsFavorite(response.isFavorite);
        setGenres(response.genres.splice(0, 2));
      }

      if (err) toast.error(err.message);
    };

    getMedia();
  }, [mediaType, mediaId, dispatch]);

  return (
    media ? (
      <>
        <Box sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent
        }}>
          {/* media videos */}
          <div ref={videoRef} style={{ paddingTop: "2rem" }}>
            <Link
              to={routesGen.mediaDetail(mediaType, mediaId)}
              style={{ color: "unset", textDecoration: "none" }}
            >
              <Container header={`${media.title || media.name} ${mediaType === tmdbConfigs.mediaType.movie ? media.release_date.split("-")[0] : media.first_air_date.split("-")[0]}`}/><br/>
            </Link>
            <MediaVideosSlide videos={[...media.videos.results].splice(0, 5)} />
          </div>
          {/* media videos */}

          {/* media reviews */}
          <MediaReview reviews={media.reviews} media={media} mediaType={mediaType} />
          {/* media reviews */}

          {/* media recommendation */}
          <Container header="you may also like">
            {media.recommend.length > 0 && (
              <RecommendSlide medias={media.recommend} mediaType={mediaType} />
            )}
            {media.recommend.length === 0 && (
              <MediaSlide
                mediaType={mediaType}
                mediaCategory={tmdbConfigs.mediaCategory.top_rated}
              />
            )}
          </Container>
          {/* media recommendation */}
        </Box>
      </>
    ) : null
  );
}

export default MediaWatch