import UrlCard from "../molecules/UrlCard";
export default function DashboardMain() {
  return (
    < div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" >
      <UrlCard shortUrl="https://bit.ly/3xqGKjW" originalUrl="https://www.techrepublic.com/article/noteworthy-technology-acquisitions-2021/" name="Noteworthy technology acquisitions 2021" clickCount={5} />
      <UrlCard shortUrl="https://bit.ly/3xqGKjW" originalUrl="https://www.techrepublic.com/article/noteworthy-technology-acquisitions-2021/" name="Noteworthy technology acquisitions 2021" clickCount={5} />
      <UrlCard shortUrl="https://bit.ly/3xqGKjW" originalUrl="https://www.techrepublic.com/article/noteworthy-technology-acquisitions-2021/" name="Noteworthy technology acquisitions 2021" clickCount={5} />
    </div >
  );
}