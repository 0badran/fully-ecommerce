import { CarouselApi } from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
  PrevButton: React.ReactNode;
  NextButton: React.ReactNode;
};

export const usePrevNextButtons = (
  api: CarouselApi
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!api) return;
    api.scrollPrev();
  }, [api]);

  const onNextButtonClick = useCallback(() => {
    if (!api) return;
    api.scrollNext();
  }, [api]);

  const onSelect = useCallback((api: CarouselApi) => {
    setPrevBtnDisabled(!api?.canScrollPrev());
    setNextBtnDisabled(!api?.canScrollNext());
  }, []);

  useEffect(() => {
    if (!api) return;

    onSelect(api);
    api.on("reInit", onSelect).on("select", onSelect);
  }, [api, onSelect]);
  const className =
    "size-8 md:size-9 lg:size-11.5 bg-secondary rounded-full cursor-pointer";
  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
    PrevButton: (
      <button
        disabled={prevBtnDisabled}
        className={className}
        onClick={onPrevButtonClick}
      >
        <ArrowLeft className="mx-auto size-4 lg:size-auto" />
      </button>
    ),
    NextButton: (
      <button
        disabled={nextBtnDisabled}
        className={className}
        onClick={onNextButtonClick}
      >
        <ArrowRight className="mx-auto size-4 lg:size-auto" />
      </button>
    ),
  };
};
