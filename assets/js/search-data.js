// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-yang-的-bios-笔记",
    title: "Yang 的 BIOS 笔记",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-bios-笔记",
          title: "BIOS 笔记",
          description: "启动流程、平台初始化与固件调试专题索引",
          section: "Navigation",
          handler: () => {
            window.location.href = "/bios/";
          },
        },{id: "nav-全部文章",
          title: "全部文章",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "post-x99-h81-pcie-x1-改x4",
      
        title: "X99 H81 PCIE X1 改X4",
      
      description: "PCIe 与存储：X99 H81 PCIE X1 改X4，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/x99-h81-pcie-x1-x4-311f6f34/";
        
      },
    },{id: "post-wdt",
      
        title: "WDT",
      
      description: "板级 IO 与电源：WDT，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/wdt-6b566e44/";
        
      },
    },{id: "post-wake-on-lan",
      
        title: "Wake on LAN",
      
      description: "板级 IO 与电源：Wake on LAN，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/wake-on-lan/";
        
      },
    },{id: "post-深入uefi内核",
      
        title: "深入UEFI内核",
      
      description: "UEFI 启动与基础：深入UEFI内核，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/uefi-2a3f07bd/";
        
      },
    },{id: "post-tpm",
      
        title: "TPM",
      
      description: "TPM 与平台安全：TPM，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/tpm/";
        
      },
    },{id: "post-spd-serial-presence-detect",
      
        title: "SPD (serial presence detect)",
      
      description: "内存与 SPD：SPD (serial presence detect)，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/spd-serial-presence-detect-97180b71/";
        
      },
    },{id: "post-skia",
      
        title: "Skia",
      
      description: "Setup / HII / TSE / Skia：Skia，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/skia-surface/";
        
      },
    },{id: "post-skia-gop",
      
        title: "Skia GOP",
      
      description: "Setup / HII / TSE / Skia：Skia GOP，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/skia-gop/";
        
      },
    },{id: "post-sio温度监测模式设置",
      
        title: "SIO温度监测模式设置",
      
      description: "板级 IO 与电源：SIO温度监测模式设置，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/sio-temperature/";
        
      },
    },{id: "post-show-mac-add",
      
        title: "Show MAC ADD",
      
      description: "UEFI 启动与基础：Show MAC ADD，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/show-mac-add-4dc9cf7b/";
        
      },
    },{id: "post-serial-port",
      
        title: "Serial Port",
      
      description: "板级 IO 与电源：Serial Port，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/serial-port-aed678c0/";
        
      },
    },{id: "post-sec-阶段与-reset-vector",
      
        title: "SEC 阶段与 Reset Vector",
      
      description: "从原笔记中的 Reset Vector 示例理解 SEC、临时内存与 PEI 交接。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/sec/";
        
      },
    },{id: "post-sdram",
      
        title: "SDRAM",
      
      description: "内存与 SPD：SDRAM，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/sdram-9dbf5997/";
        
      },
    },{id: "post-registernotification",
      
        title: "RegisterNotification",
      
      description: "Setup / HII / TSE / Skia：RegisterNotification，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/registernotification-9e552407/";
        
      },
    },{id: "post-pxe",
      
        title: "PXE",
      
      description: "UEFI 启动与基础：PXE，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/pxe-2103aca7/";
        
      },
    },{id: "post-pull-up-pull-down",
      
        title: "pull-up_pull-down",
      
      description: "板级 IO 与电源：pull-up_pull-down，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/pull-up-pull-down-15139afe/";
        
      },
    },{id: "post-ps2",
      
        title: "PS2",
      
      description: "板级 IO 与电源：PS2，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/ps2-f64a08f7/";
        
      },
    },{id: "post-power-on-after-g3",
      
        title: "Power On After G3",
      
      description: "板级 IO 与电源：Power On After G3，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/power-on-after-g3-f75ff4f0/";
        
      },
    },{id: "post-post过程中按f9-跳转winre",
      
        title: "POST过程中按F9 跳转WinRE",
      
      description: "UEFI 启动与基础：POST过程中按F9 跳转WinRE，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/post-f9-winre-0c1cf3cc/";
        
      },
    },{id: "post-pei",
      
        title: "PEI",
      
      description: "UEFI 启动与基础：PEI，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/pei/";
        
      },
    },{id: "post-x1设备找不到",
      
        title: "X1设备找不到",
      
      description: "PCIe 与存储：X1设备找不到，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/pcie-x1-enumeration/";
        
      },
    },{id: "post-pci",
      
        title: "PCI",
      
      description: "PCIe 与存储：PCI，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/pci-ebf572ee/";
        
      },
    },{id: "post-pci通义万问",
      
        title: "PCI通义万问",
      
      description: "PCIe 与存储：PCI通义万问，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/pci-66694d7f/";
        
      },
    },{id: "post-pci总线组成结构",
      
        title: "PCI总线组成结构",
      
      description: "PCIe 与存储：PCI总线组成结构，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/pci-4057e43c/";
        
      },
    },{id: "post-option-rom-oprom",
      
        title: "Option Rom(OpRom)",
      
      description: "PCIe 与存储：Option Rom(OpRom)，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/option-rom-oprom-a1d19749/";
        
      },
    },{id: "post-nvme首启调试会话总结-2026-03-17",
      
        title: "NVMe首启调试会话总结-2026-03-17",
      
      description: "PCIe 与存储：NVMe首启调试会话总结-2026-03-17，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/nvme-first-boot-debug/";
        
      },
    },{id: "post-边沿触发-amp-电平触发",
      
        title: "边沿触发&amp;电平触发",
      
      description: "板级 IO 与电源：边沿触发&amp;电平触发，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/note-5353c57a/";
        
      },
    },{id: "post-n100-nvme-wifi-hang-windows-os-logo",
      
        title: "N100 NVME+WIFI hang Windows OS logo",
      
      description: "PCIe 与存储：N100 NVME+WIFI hang Windows OS logo，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/n100-nvme-wifi-hang-windows-os-logo-1616d076/";
        
      },
    },{id: "post-memory-timing-not-match-spec-issue",
      
        title: "Memory timing not match SPEC issue",
      
      description: "内存与 SPD：Memory timing not match SPEC issue，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/memory-timing-not-match-spec-issue-e1cf3bcb/";
        
      },
    },{id: "post-memory-slot",
      
        title: "Memory Slot",
      
      description: "内存与 SPD：Memory Slot，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/memory-slot-1b6b2fe3/";
        
      },
    },{id: "post-memory-overview",
      
        title: "Memory Overview",
      
      description: "内存与 SPD：Memory Overview，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/memory-overview-ab651482/";
        
      },
    },{id: "post-memory-controller",
      
        title: "Memory Controller",
      
      description: "内存与 SPD：Memory Controller，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/memory-controller-ed9d8d38/";
        
      },
    },{id: "post-m-2",
      
        title: "M.2",
      
      description: "PCIe 与存储：M.2，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/m2-signals/";
        
      },
    },{id: "post-logo-inmp",
      
        title: "LOGO inmp",
      
      description: "Setup / HII / TSE / Skia：LOGO inmp，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/logo-inmp-b404274b/";
        
      },
    },{id: "post-logo",
      
        title: "logo",
      
      description: "Setup / HII / TSE / Skia：logo，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/logo-0a6c2bb6/";
        
      },
    },{id: "post-intel-8042",
      
        title: "Intel 8042",
      
      description: "板级 IO 与电源：Intel 8042，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/intel-8042-36b0f385/";
        
      },
    },{id: "post-gpio",
      
        title: "GPIO",
      
      description: "板级 IO 与电源：GPIO，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/gpio/";
        
      },
    },{id: "post-gop",
      
        title: "GOP",
      
      description: "显示与音频：GOP，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/gop/";
        
      },
    },{id: "post-fsb-dram",
      
        title: "FSB ：DRAM",
      
      description: "内存与 SPD：FSB ：DRAM，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/fsb-dram-987604b5/";
        
      },
    },{id: "post-fixbootorder",
      
        title: "FixBootOrder",
      
      description: "UEFI 启动与基础：FixBootOrder，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/fixbootorder-0ae2bed9/";
        
      },
    },{id: "post-dsc中的inc",
      
        title: "DSC中的inc",
      
      description: "UEFI 启动与基础：DSC中的inc，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/edk2-dsc-include/";
        
      },
    },{id: "post-edk",
      
        title: "EDK",
      
      description: "UEFI 启动与基础：EDK，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/edk-8ae4fcb1/";
        
      },
    },{id: "post-dump-variable-in-shell",
      
        title: "Dump Variable in shell",
      
      description: "UEFI 启动与基础：Dump Variable in shell，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/dump-variable-in-shell-44faf5ed/";
        
      },
    },{id: "post-set-dtpm-by-default",
      
        title: "Set dTPM by default",
      
      description: "TPM 与平台安全：Set dTPM by default，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/dtpm-default/";
        
      },
    },{id: "post-2026-04-20-dp-hotplug-win11-复盘",
      
        title: "2026-04-20-DP-Hotplug-Win11-复盘",
      
      description: "显示与音频：2026-04-20-DP-Hotplug-Win11-复盘，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/dp-hotplug-windows11/";
        
      },
    },{id: "post-dp",
      
        title: "DP++",
      
      description: "显示与音频：DP++，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/dp-d43433e0/";
        
      },
    },{id: "post-dos-hang",
      
        title: "DOS Hang",
      
      description: "调试案例与工具：DOS Hang，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/dos-hang-92a39ab1/";
        
      },
    },{id: "post-detecttimeoutms",
      
        title: "DetectTimeoutMs",
      
      description: "调试案例与工具：DetectTimeoutMs，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/detecttimeoutms-872f926d/";
        
      },
    },{id: "post-debug-log",
      
        title: "DEBUG Log",
      
      description: "调试案例与工具：DEBUG Log，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/debug-log-d3a3dd83/";
        
      },
    },{id: "post-cpu-power-consumption",
      
        title: "CPU Power Consumption",
      
      description: "平台与 CPU：CPU Power Consumption，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/cpu-power-consumption-8e408a75/";
        
      },
    },{id: "post-cpu-information",
      
        title: "CPU information",
      
      description: "平台与 CPU：CPU information，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/cpu-information-7190389d/";
        
      },
    },{id: "post-cpu",
      
        title: "CPU",
      
      description: "平台与 CPU：CPU，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/cpu-84664b75/";
        
      },
    },{id: "post-boot-time-so-long",
      
        title: "Boot time so long",
      
      description: "调试案例与工具：Boot time so long，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/boot-time-so-long-3e449090/";
        
      },
    },{id: "post-bios-setup-ui-add-item",
      
        title: "BIOS setup UI add item",
      
      description: "Setup / HII / TSE / Skia：BIOS setup UI add item，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/bios-setup-ui-add-item-ade7a8db/";
        
      },
    },{id: "post-如何在操作系统下获得bios和硬件信息-一-什么是dmi和wmi",
      
        title: "如何在操作系统下获得BIOS和硬件信息（一）：什么是DMI和WMI？",
      
      description: "UEFI 启动与基础：如何在操作系统下获得BIOS和硬件信息（一）：什么是DMI和WMI？，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/bios-dmi-wmi-c1257cd0/";
        
      },
    },{id: "post-bios-系统语言",
      
        title: "BIOS 系统语言",
      
      description: "UEFI 启动与基础：BIOS 系统语言，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/bios-d6cbac36/";
        
      },
    },{id: "post-bios-ami-tse-navigation",
      
        title: "BIOS AMI TSE NAVIGATION",
      
      description: "Setup / HII / TSE / Skia：BIOS AMI TSE NAVIGATION，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/bios-ami-tse-navigation-2e4419bb/";
        
      },
    },{id: "post-beep",
      
        title: "Beep",
      
      description: "UEFI 启动与基础：Beep，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/beep-1ac3cd87/";
        
      },
    },{id: "post-audio",
      
        title: "AUDIO",
      
      description: "显示与音频：AUDIO，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/audio-d8a45732/";
        
      },
    },{id: "post-amitsepkg-skiapkg-刷新机制详细分析",
      
        title: "AmiTsePkg_SkiaPkg_刷新机制详细分析",
      
      description: "Setup / HII / TSE / Skia：AmiTsePkg_SkiaPkg_刷新机制详细分析，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/amitsepkg-skiapkg-2bc28f95/";
        
      },
    },{id: "post-amitse",
      
        title: "AMITse",
      
      description: "Setup / HII / TSE / Skia：AMITse，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/amitse-133a7a5a/";
        
      },
    },{id: "post-amistatuscode-串口输出链路",
      
        title: "AmiStatusCode 串口输出链路",
      
      description: "调试案例与工具：AmiStatusCode 串口输出链路，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/ami-status-code-serial/";
        
      },
    },{id: "post-ami-post-manager-protocol",
      
        title: "AMI POST Manager Protocol",
      
      description: "Setup / HII / TSE / Skia：AMI POST Manager Protocol，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/ami-post-manager-protocol-bc0b7598/";
        
      },
    },{id: "post-ami-parseveb-报错-expecting-keyword-或-unknown-token",
      
        title: "AMI ParseVeB 报错 “Expecting keyword” 或 “Unknown Token”",
      
      description: "调试案例与工具：AMI ParseVeB 报错 “Expecting keyword” 或 “Unknown Token”，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/ami-parseveb-encoding/";
        
      },
    },{id: "post-amd-psp",
      
        title: "AMD PSP",
      
      description: "TPM 与平台安全：AMD PSP，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/amd-psp-3d539823/";
        
      },
    },{id: "post-amd-配置pcie-clock",
      
        title: "AMD 配置PCIe clock",
      
      description: "PCIe 与存储：AMD 配置PCIe clock，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/amd-pcie-clock-f6b38703/";
        
      },
    },{id: "post-amd-itx-fp5",
      
        title: "AMD-ITX-FP5",
      
      description: "平台与 CPU：AMD-ITX-FP5，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/amd-itx-fp5-c44237b9/";
        
      },
    },{id: "post-amd-display",
      
        title: "AMD Display",
      
      description: "显示与音频：AMD Display，整理自个人 BIOS / UEFI 笔记。",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/notes/amd-display-f94371dc/";
        
      },
    },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
