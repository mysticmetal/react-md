/** this is a generated file from `dev-utils sandbox` */
import { IFiles } from "codesandbox-import-utils/lib/api/define";

import { upperFirst } from "utils/toTitle";

interface SandboxesRecord {
  [key: string]: () => Promise<IFiles>;
}

const resolve = (importer: Promise<any>) =>
  importer.then(content => content.default as IFiles);

const sandboxes: SandboxesRecord = {
  "AppBar/AnimatingAppBar": () =>
    resolve(import("./AppBar/AnimatingAppBarSandbox.json")),
  "AppBar/AutoDense": () => resolve(import("./AppBar/AutoDenseSandbox.json")),
  "AppBar/DifferentSizes": () =>
    resolve(import("./AppBar/DifferentSizesSandbox.json")),
  "AppBar/FixedWithOffset": () =>
    resolve(import("./AppBar/FixedWithOffsetSandbox.json")),
  "AppBar/SimpleUsage": () =>
    resolve(import("./AppBar/SimpleUsageSandbox.json")),
  "Avatar/ColorExamples": () =>
    resolve(import("./Avatar/ColorExamplesSandbox.json")),
  "Avatar/SimpleUsage": () =>
    resolve(import("./Avatar/SimpleUsageSandbox.json")),
  "Button/ContainedButtons": () =>
    resolve(import("./Button/ContainedButtonsSandbox.json")),
  "Button/CustomButtonTheme": () =>
    resolve(import("./Button/CustomButtonThemeSandbox.json")),
  "Button/IconButtons": () =>
    resolve(import("./Button/IconButtonsSandbox.json")),
  "Button/OutlinedButtons": () =>
    resolve(import("./Button/OutlinedButtonsSandbox.json")),
  "Button/TextButtons": () =>
    resolve(import("./Button/TextButtonsSandbox.json")),
  "Button/TextButtonsWithIcons": () =>
    resolve(import("./Button/TextButtonsWithIconsSandbox.json")),
  "Divider/HorizontalDividers": () =>
    resolve(import("./Divider/HorizontalDividersSandbox.json")),
  "Divider/VerticalDividers": () =>
    resolve(import("./Divider/VerticalDividersSandbox.json")),
  "Divider/WithinLists": () =>
    resolve(import("./Divider/WithinListsSandbox.json")),
  "Elevation/AllElevations": () =>
    resolve(import("./Elevation/AllElevationsSandbox.json")),
  "Elevation/AnimatingElevation": () =>
    resolve(import("./Elevation/AnimatingElevationSandbox.json")),
  "Icon/IconSpacing": () => resolve(import("./Icon/IconSpacingSandbox.json")),
  "Icon/SimpleExamples": () =>
    resolve(import("./Icon/SimpleExamplesSandbox.json")),
  "Link/MaliciousTarget": () =>
    resolve(import("./Link/MaliciousTargetSandbox.json")),
  "Link/SimpleExamples": () =>
    resolve(import("./Link/SimpleExamplesSandbox.json")),
  "Link/ThirdPartyRoutingLibraries": () =>
    resolve(import("./Link/ThirdPartyRoutingLibrariesSandbox.json")),
  "Link/WithButtonStyles": () =>
    resolve(import("./Link/WithButtonStylesSandbox.json")),
  "Link/WithIcons": () => resolve(import("./Link/WithIconsSandbox.json")),
  "List/NonInteractable": () =>
    resolve(import("./List/NonInteractableSandbox.json")),
  "List/SingleLineExamples": () =>
    resolve(import("./List/SingleLineExamplesSandbox.json")),
  "List/ThreeLineExamples": () =>
    resolve(import("./List/ThreeLineExamplesSandbox.json")),
  "List/TwoLineExamples": () =>
    resolve(import("./List/TwoLineExamplesSandbox.json")),
  "MaterialIcons/AllIcons": () =>
    resolve(import("./MaterialIcons/AllIconsSandbox.json")),
  "MaterialIcons/SimpleExamples": () =>
    resolve(import("./MaterialIcons/SimpleExamplesSandbox.json")),
  "Media/ForcedAspectRatio": () =>
    resolve(import("./Media/ForcedAspectRatioSandbox.json")),
  "Media/SimpleResponsiveMedia": () =>
    resolve(import("./Media/SimpleResponsiveMediaSandbox.json")),
  "Media/WithOverlay": () => resolve(import("./Media/WithOverlaySandbox.json")),
  "Overlay/CustomTheme": () =>
    resolve(import("./Overlay/CustomThemeSandbox.json")),
  "Overlay/FixingOverflowIssues": () =>
    resolve(import("./Overlay/FixingOverflowIssuesSandbox.json")),
  "Overlay/SimpleExample": () =>
    resolve(import("./Overlay/SimpleExampleSandbox.json")),
  "Portal/CustomPortalContainer": () =>
    resolve(import("./Portal/CustomPortalContainerSandbox.json")),
  "Portal/SimpleExample": () =>
    resolve(import("./Portal/SimpleExampleSandbox.json")),
  "Sheet/PositionExamples": () =>
    resolve(import("./Sheet/PositionExamplesSandbox.json")),
  "States/CustomComponent": () =>
    resolve(import("./States/CustomComponentSandbox.json")),
  "States/CustomInteractions": () =>
    resolve(import("./States/CustomInteractionsSandbox.json")),
  "States/DisablingRippleEffect": () =>
    resolve(import("./States/DisablingRippleEffectSandbox.json")),
  "States/SetupExample": () =>
    resolve(import("./States/SetupExampleSandbox.json")),
  "Typography/TextContainerExamples": () =>
    resolve(import("./Typography/TextContainerExamplesSandbox.json")),
  "Typography/TextExamples": () =>
    resolve(import("./Typography/TextExamplesSandbox.json")),
};

const dummy = () =>
  Promise.resolve<IFiles>({
    "package.json": {
      isBinary: false,
      content: JSON.stringify({
        dependencies: {
          react: "latest",
          "react-dom": "latest",
        },
      }),
    },
    "src/index.tsx": { content: "", isBinary: false },
    "src/Demo.tsx": { content: "", isBinary: false },
  });

export default function getSandboxer(packageName: string, demoName: string) {
  packageName = packageName.replace(/ /g, "");
  demoName = demoName
    .split(" ")
    .map(upperFirst)
    .join("");
  const sandboxer = sandboxes[`${packageName}/${demoName}`];
  if (!sandboxer) {
    console.error(
      "Unable to find a sandbox import for the following package and demo name"
    );
    console.error("packageName: ", packageName);
    console.error("demoName: ", demoName);
    return dummy;
  }

  return sandboxer;
}
