import { useState } from "react";

export interface UseQueueOptions<T> {
  /** Initial values to be added to the queue */
  initialValues?: T[];

  /** Maximum number of items in the state */
  limit: number;
}

export interface UseQueueReturnValue<T> {
  /** Array of items in the queue */
  queue: T[];

  /** Array of items in the state */
  state: T[];

  /** Function to add items to state or queue */
  add: (...items: T[]) => void;

  /** Function to apply updates to current items */
  update: (fn: (state: T[]) => T[]) => void;

  /** Function to clear the queue */
  cleanQueue: () => void;
}

/**
 * Keeps a fixed-size active list and stores overflow items in a secondary queue.
 * Added values are appended in order, then split into `state` (up to `limit`) and `queue` (the rest).
 *
 * @param {UseQueueOptions<T>} options - Queue configuration.
 * @param {T[] | undefined} options.initialValues - Initial values to seed the active `state` and overflow `queue`.
 * @param {number} options.limit - Maximum number of items kept in `state`.
 */
export const useQueue = <T>({
  initialValues = [],
  limit,
}: UseQueueOptions<T>): UseQueueReturnValue<T> => {
  const [state, setState] = useState({
    state: initialValues.slice(0, limit),
    queue: initialValues.slice(limit),
  });

  const add = (...items: T[]) =>
    setState((current) => {
      const results = [...current.state, ...current.queue, ...items];

      return {
        state: results.slice(0, limit),
        queue: results.slice(limit),
      };
    });

  const update = (fn: (state: T[]) => T[]) =>
    setState((current) => {
      const results = fn([...current.state, ...current.queue]);

      return {
        state: results.slice(0, limit),
        queue: results.slice(limit),
      };
    });

  const cleanQueue = () =>
    setState((current) => ({ state: current.state, queue: [] }));

  return {
    state: state.state,
    queue: state.queue,
    add,
    update,
    cleanQueue,
  };
};

export type UseQueueOptionsType<T> = UseQueueOptions<T>;
export type UseQueueReturnType<T> = UseQueueReturnValue<T>;
