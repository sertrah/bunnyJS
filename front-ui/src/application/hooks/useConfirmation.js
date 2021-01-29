import { useContext } from "react";
import { ConfirmationContext } from "../contexts";

/**
 * Returns a confirm function that accepts an object with:
 * - header
 * - message
 * - yes - callback fn
 * - no - callback fn (optional)
 */
export const useConfirmation = () => {
  const context = useContext(ConfirmationContext);

  if (!context) {
    throw Error(
      "The `useConfirmation` hook must be called from a descendent of the `ConfirmationContext`."
    );
  }

  return context;
};
