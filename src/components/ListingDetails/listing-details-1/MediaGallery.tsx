import Image, { StaticImageData } from "next/image";
import Fancybox from "@/components/common/Fancybox";
import { SyntheticEvent } from "react";

import bigCarousel_1 from "@/assets/images/listing/img_43.jpg";
import bigCarousel_2 from "@/assets/images/listing/img_44.jpg";
import bigCarousel_3 from "@/assets/images/listing/img_45.jpg";
import bigCarousel_4 from "@/assets/images/listing/img_46.jpg";

import smallCarousel_1 from "@/assets/images/listing/img_43_s.jpg";
import smallCarousel_2 from "@/assets/images/listing/img_44_s.jpg";
import smallCarousel_3 from "@/assets/images/listing/img_45_s.jpg";
import smallCarousel_4 from "@/assets/images/listing/img_46_s.jpg";

const largeThumb: string[] = ["1", "2", "3"];

interface DataType {
  big_carousel: StaticImageData[];
  small_carousel: StaticImageData[];
}

interface Media {
  ClassName: string;
  MediaCategory: string;
  MediaKey: string;
  MediaModificationTimestamp: string;
  MediaObjectID: string;
  MediaStatus: string;
  MediaType: string;
  MediaURL: string;
  Order: number;
  PreferredPhotoYN: boolean;
  ResourceName: string;
  ResourceRecordKey: string;
  ShortDescription: string;
  ImageSizeDescription: string;
}

const gallery_data: DataType = {
  big_carousel: [bigCarousel_1, bigCarousel_2, bigCarousel_3, bigCarousel_4],
  small_carousel: [
    smallCarousel_1,
    smallCarousel_2,
    smallCarousel_3,
    smallCarousel_4,
  ],
};

const { big_carousel, small_carousel } = gallery_data;

const MediaGallery = ({ style, data }: any) => {
  const handleImageError = (error: SyntheticEvent<HTMLImageElement, Event>) => {
    console.log("Error loading image:", error); // Log the error event to the console
    // You can also handle other error recovery logic here
  };

  const thumbnailImages = data.value.filter((carousel: any) => carousel.ImageSizeDescription === 'Thumbnail');
  const totalThumbnails = thumbnailImages.length;

  return (
    <div className="media-gallery sm:mt-4 md:mb-0 mb-4">
      <div id="media_slider" className="carousel slide row">
        {/* Using Flexbox for layout */}
        <div className="flex justify-between md:flex-row w-full flex-col gap-2 items-center ">
          {/* Large Carousel Section */}
          <div
            className="carousel-large md:w-[82%] w-full md:h-[92vh] h-full flex-grow-1"
          >
            <div className={`border-20  ${style ? "" : "shadow4 p-0"}`}>
              <div className="position-relative z-1 overflow-hidden rounded-[20px]">
                <div className="img-fancy-btn border-10 fw-500 fs-16 color-dark md:block hidden">
                  Sell all {totalThumbnails} Photos
                  <Fancybox
                    options={{
                      Carousel: {
                        infinite: true,
                      },
                    }}
                  >
                    {data.value
                      .filter((thumb: any) => thumb.ImageSizeDescription === 'Largest')
                      .map((thumb: any, index: any) => (
                      <a
                        key={index}
                        className="d-block"
                        data-fancybox="img2"
                        href={thumb.MediaURL}
                      ></a>
                    ))}
                  </Fancybox>
                </div>

                <div className="carousel-inner">
                  {data.value
                    .filter((carousel: any) => carousel.ImageSizeDescription === 'Largest')
                    .map((carousel: any, index: any) => {
                      return(
                        <div key={index} className={`carousel-item ${index == 0 ? 'active' : ''}`}> 
                          <div className="w-full md:h-[92vh]">
                            <Image
                              src={carousel.MediaURL}
                              alt=""
                              className="w-full h-full bg-cover rounded-[20px]"
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                        </div>
                      )
                    }
                  )}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#media_slider"
                  data-bs-slide="prev"
                >
                  <i className="bi bi-chevron-left"></i>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#media_slider"
                  data-bs-slide="next"
                >
                  <i className="bi bi-chevron-right"></i>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>

          {/* Small Carousel Section */}
          <div
            className="md:w-[17.7%] w-full  md:h-[92vh] md:gap-0 gap-2 flex md:flex-col   justify-between"
            style={{
              paddingTop: "0px", // Space at the top of the small carousel
              // paddingBottom: "10px", // Space at the bottom of the small carousel
            }}
          >
            {data.value
              .filter((carousel : any) => carousel.ImageSizeDescription === 'Thumbnail')
              .slice(0, 4)
              .map((carousel: any , index: any) => (
                <div
                  key={index}
                  className={`flex md:flex-col flex-row w-full ${index === 0 ? 'active' : ''}`}
                >
                  <Image
                    src={carousel.MediaURL}
                    alt=""
                    className="w-full sm:h-[calc(88vh/4)] h-full bg-cover sm:rounded-[20px] rounded-m"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    width={300}
                    height={169}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaGallery;
