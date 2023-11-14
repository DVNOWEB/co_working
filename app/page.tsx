import getListings, {IListingsParams} from './actions/getListings'
import getCurrentUser from './actions/getCurrentUser'

import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import Hero from './components/Hero'
import HeroBanner from './components/HeroBanner'
import InfoBannerOne from './components/InfoBannerOne'
import InfoBannerTwo from './components/InfoBannerTwo'
import Footer from './components/Footer'
import ArraySlicer from './components/ArraySlicer'

interface HomeProps {
  searchParams: IListingsParams
};

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return <div className="text-center">No listings found!</div>
  }

  return (
    <ClientOnly>
      <Hero />
      <HeroBanner />
      <Container>
        <div className="py-6 md:pt-20 md:pb-4">
          <ArraySlicer
            listings={listings.slice(0, 3)}
            currentUser={currentUser}
          />
        </div>
      </Container>
      <InfoBannerOne />
      <Container>
        <div className="py-6  md:pt-4 md:pb-16">
          <ArraySlicer
            listings={listings.slice(3, 6)}
            currentUser={currentUser}
          />
        </div>
      </Container>
      <InfoBannerTwo />
      <Container>
        <div className="py-6 md:py-16">
          <ArraySlicer
            listings={listings.slice(6, 9)}
            currentUser={currentUser}
          />
        </div>
      </Container>
      <Footer />
    </ClientOnly>
  )
}
export default Home