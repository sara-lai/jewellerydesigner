// copying from p3/kampong lah
// not using right this moment, using simpler modal windows for now

// https://github.com/akiran/react-slick/
// for ease made compatible for 1 image (skips carousel) or many images (launches carousel)

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Box, Image, IconButton, Flex } from '@chakra-ui/react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
// todo find some really nice arrows/side that doesnt uglify

const ImageCarousel = ({ imageUrls, onImageClick, containOrCover, maxHeight}) => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <FiChevronRight />,
        prevArrow:  <FiChevronLeft />
    }
    const objFitType = containOrCover || 'cover'
    const maxH = maxHeight || "440px"
    return (
        <Box>
            {imageUrls?.length === 1 && (
                <Image src={imageUrls[0]} mt={4} width="100%" maxH={maxH} objectFit={objFitType} cursor='pointer' 
                    onClick={onImageClick}
                />                    
            )}
            {imageUrls?.length > 1 && (
                <Box className="slider-container">
                    <Slider {...sliderSettings}>
                        {imageUrls.map((imgUrl, idx) => (
                            <Box key={idx}>
                                <Image src={imgUrl} mt={4} width="100%" maxH={maxH} objectFit={objFitType} cursor='pointer' 
                                    onClick={onImageClick}
                                />
                            </Box>
                        ))}                        
                    </Slider>
                </Box>
            )}
        </Box>  
    )
}

export default ImageCarousel