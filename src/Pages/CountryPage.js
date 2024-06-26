import Detail from "../Components/Detail";
import Btn from "../Components/Btn";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Preloader from "../Components/Preloader";

const CountryPage = () => {
  let { id } = useParams();

  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const findCountry = async () => {
      setIsLoading(true);
      const data = await fetch(
        `https://countryinfoapi.com/api/countries/${id}`
      );
      const result = await data.json();

      setCountry(result);
      setIsLoading(false);
    };
    findCountry();

    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      {isLoading && <Preloader />}
      {country && (
        <>
          <div className="px-5 min-h-fit  pt-20 mx-auto text-left text-VDGrayBG dark:text-whiteN relative  ">
            <div className="sm:mt-24 mt-9 ">
              <Btn link={"/"} class={" text-lg"}>
                <svg
                  className="fill-VDGrayBG dark:fill-whiteN w-5 mr-3"
                  viewBox="0 0 512 512"
                >
                  <title>Arrow Back</title>
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="48"
                    d="M244 400L100 256l144-144M120 256h292"
                  />
                </svg>
                Back
              </Btn>
              <div className="grid grid-cols-1 sm:grid-cols-2 sm:items-center gap-5 overflow-hidden mt-10 mb-10">
                <div>
                  <img
                    src={country.flag}
                    className=" w-full aspect-video object-fill"
                    alt={country.name}
                  />
                </div>
                <div className="">
                  <h2 className="font-extrabold text-2xl">{country.name}</h2>
                  <div className="md:grid md:grid-cols-2">
                    <div className="mt-3">
                      <Detail heading={"Native Name"} detail={country.name} />
                      <Detail
                        heading={"Population"}
                        detail={country.population.toLocaleString("en-US")}
                      />
                      <Detail heading={"Region"} detail={country.region} />
                      <Detail
                        heading={"Sub Region"}
                        detail={country.subregion}
                      />
                      <Detail heading={"Capital"} detail={country.capital[0]} />
                    </div>
                    <div className="mt-3">
                      <Detail
                        heading={"Top Level Domain"}
                        detail={country.tld[0]}
                      />
                      <Detail
                        heading={"Currencies"}
                        detail={Object.values(country.currencies)[0].name}
                      />
                      <Detail
                        heading={"Languages"}
                        detail={Object.values(country.languages).join(",  ")}
                      />
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-8">
                    {country && country.borders === undefined ? (
                      <h3 className="text-xl font-semibold">
                        This country do not share border with another country.{" "}
                      </h3>
                    ) : (
                      <div>
                        <h3 className="text-xl font-semibold">
                          Border Countries:
                        </h3>
                        <div className="mt-3 flex flex-wrap">
                          {country.borders &&
                            !(country.borders === undefined) &&
                            country.borders.map((i, index) => {
                              return (
                                <Btn
                                  link={`/country/${i}`}
                                  class={"mr-2 mb-2"}
                                  key={index}
                                >
                                  {i}
                                </Btn>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CountryPage;
