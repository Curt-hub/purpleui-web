// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "PurpleUI",
    platforms: [
        .iOS(.v16),
        .macOS(.v13)
    ],
    products: [
        .library(name: "PurpleUI", targets: ["PurpleUI"])
    ],
    targets: [
        .target(
            name: "PurpleUI",
            path: "Sources/PurpleUI"
        )
    ]
)
