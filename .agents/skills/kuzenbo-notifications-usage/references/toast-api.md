# Toast API Surface (Stable 0.0.6)

Public import path:

```ts
import { ... } from "@kuzenbo/notifications/ui/toast";
```

## Main APIs

- `Toast`
- `ToastProvider`
- `useToast`
- `createToastManager`
- `useToastManager`

## Namespace Primitives

- `Toast.Root`
- `Toast.Content`
- `Toast.Title`
- `Toast.Description`
- `Toast.Action`
- `Toast.Close`
- `Toast.Arrow`
- `Toast.Portal`
- `Toast.Positioner`
- `Toast.Viewport`
- `Toast.Provider`

## `useToast()` methods

- `add(options)`
- `success(options)`
- `error(options)`
- `info(options)`
- `warning(options)`
- `loading(options)`
- `promise(promise, options)`
- `update(toastId, options)`
- `close(toastId)`
- `toasts` (readonly list)

## Exported Types

- `ToastProps`
- `ToastProviderProps`
- `ToastActionProps`
- `ToastArrowProps`
- `ToastCloseProps`
- `ToastContentProps`
- `ToastDescriptionProps`
- `ToastPortalProps`
- `ToastPositionerProps`
- `ToastRootProps`
- `ToastSize`
- `ToastTitleProps`
- `ToastViewportProps`
