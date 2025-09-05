import { formateTime, renderDuration } from '@/utils/time'

const mainTheme = {
  colorScheme: {
    default: {
      palette: {
        backgroundColor: '#ffffff'
      },
      dataScheme: [
        {
          maxDomainLength: 10,
          scheme: [
            '#27296d',
            '#c93e5a',
            '#053c6eff',
            '#603f06',
            '#a05b08',
            '#00373c',
            '#8455c2',
            '#00303c',
            '#233c12',
            '#79178a'
          ]
        }
      ]
    }
  },
  component: {
    title: {
      textStyle: {
        visible: true,
        fontSize: 18,
        fontWeight: 600,
        lineHeight: 24,
        fontFamily: [
          'Inter',
          'BlinkMacSystemFont',
          'Segoe UI',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif'
        ],
        fill: '#1d1c23ff'
      },
      subtextStyle: {
        visible: true,
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 20,
        fontFamily: [
          'Inter',
          'BlinkMacSystemFont',
          'Segoe UI',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif'
        ],
        fill: '#1d1c2359'
      }
    },
    axisX: {
      title: {
        visible: false,
        position: 'center'
      },
      label: {
        visible: true,
        style: {
          fontSize: 12,
          fontWeight: 400,
          lineHeight: 16,
          fontFamily: [
            'Inter',
            'BlinkMacSystemFont',
            'Segoe UI',
            'PingFang SC',
            'Hiragino Sans GB',
            'Microsoft YaHei',
            'Helvetica Neue',
            'Helvetica',
            'Arial',
            'sans-serif'
          ],
          fill: '#1d1c23a6'
        },
        space: 4
      },
      domainLine: {
        visible: true,
        style: {
          lineWidth: 1,
          stroke: '#c6c6cdff'
        }
      },
      tick: {
        visible: true,
        style: {
          lineWidth: 1,
          stroke: '#c6c6cdff'
        }
      },
      subTick: {
        visible: false
      },
      grid: {
        visible: false
      },
      subGrid: {
        visible: false
      }
    },
    axisY: {
      title: {
        visible: false,
        position: 'center'
      },
      label: {
        visible: true,
        style: {
          fontSize: 12,
          fontWeight: 400,
          lineHeight: 16,
          fontFamily: [
            'Inter',
            'BlinkMacSystemFont',
            'Segoe UI',
            'PingFang SC',
            'Hiragino Sans GB',
            'Microsoft YaHei',
            'Helvetica Neue',
            'Helvetica',
            'Arial',
            'sans-serif'
          ],
          fill: '#1d1c23a6'
        },
        space: 8
      },
      domainLine: {
        visible: false
      },
      tick: {
        visible: false
      },
      subTick: {
        visible: false
      },
      grid: {
        visible: true,
        style: {
          lineWidth: 1,
          stroke: '#c6c6cdff',
          lineDash: [2, 2]
        }
      },
      subGrid: {
        visible: false
      }
    },
    axisRadius: {
      title: {
        visible: false,
        position: 'center'
      },
      label: {
        visible: true,
        style: {
          fontSize: 12,
          fontWeight: 400,
          lineHeight: 16,
          fontFamily: [
            'Inter',
            'BlinkMacSystemFont',
            'Segoe UI',
            'PingFang SC',
            'Hiragino Sans GB',
            'Microsoft YaHei',
            'Helvetica Neue',
            'Helvetica',
            'Arial',
            'sans-serif'
          ],
          fill: '#1d1c23a6'
        },
        space: 4
      },
      domainLine: {
        visible: true,
        style: {
          lineWidth: 1,
          stroke: '#c6c6cdff'
        }
      },
      tick: {
        visible: true,
        style: {
          lineWidth: 1,
          stroke: '#c6c6cdff'
        }
      },
      subTick: {
        visible: false
      },
      grid: {
        visible: false
      },
      subGrid: {
        visible: false
      }
    },
    axisAngle: {
      title: {
        visible: false,
        position: 'center'
      },
      label: {
        visible: true,
        style: {
          fontSize: 12,
          fontWeight: 400,
          lineHeight: 16,
          fontFamily: [
            'Inter',
            'BlinkMacSystemFont',
            'Segoe UI',
            'PingFang SC',
            'Hiragino Sans GB',
            'Microsoft YaHei',
            'Helvetica Neue',
            'Helvetica',
            'Arial',
            'sans-serif'
          ],
          fill: '#1d1c23a6'
        },
        space: 8
      },
      domainLine: {
        visible: true,
        style: {
          lineWidth: 1,
          stroke: '#c6c6cdff'
        }
      },
      tick: {
        visible: false
      },
      subTick: {
        visible: false
      },
      grid: {
        visible: true,
        style: {
          lineWidth: 1,
          stroke: '#c6c6cdff',
          lineDash: [2, 2]
        }
      },
      subGrid: {
        visible: false
      }
    },
    discreteLegend: {
      title: {
        visible: false,
        align: 'start'
      },
      item: {
        background: {
          state: {
            unSelectedHover: {
              fill: '#1d1c230d'
            },
            selectedHover: {
              fill: '#1d1c230d'
            }
          }
        },
        spaceCol: 16,
        spaceRow: 4,
        label: {
          style: {
            visible: true,
            fontSize: 12,
            fontWeight: 400,
            lineHeight: 16,
            fontFamily: [
              'Inter',
              'BlinkMacSystemFont',
              'Segoe UI',
              'PingFang SC',
              'Hiragino Sans GB',
              'Microsoft YaHei',
              'Helvetica Neue',
              'Helvetica',
              'Arial',
              'sans-serif'
            ],
            fill: '#1d1c23a6'
          },
          state: {
            unSelected: {
              fill: '#1d1c23a6',
              fillOpacity: 0.3
            }
          },
          space: 4
        },
        value: {
          style: {
            visible: true,
            fontSize: 12,
            fontWeight: 400,
            lineHeight: 16,
            fontFamily: [
              'Inter',
              'BlinkMacSystemFont',
              'Segoe UI',
              'PingFang SC',
              'Hiragino Sans GB',
              'Microsoft YaHei',
              'Helvetica Neue',
              'Helvetica',
              'Arial',
              'sans-serif'
            ],
            fill: '#1d1c23ff'
          },
          state: {
            unSelected: {
              fill: '#1d1c23ff',
              fillOpacity: 0.3
            }
          }
        },
        shape: {
          space: 2,
          state: {
            unSelected: {
              fillOpacity: 0.3
            }
          }
        }
      },
      pager: {
        textStyle: {
          fill: '#1d1c23a6'
        }
      },
      orient: 'top',
      position: 'middle',
      padding: {
        bottom: 12
      },
      maxRow: 1,
      maxCol: 1
    },
    tooltip: {
      spaceRow: 4,
      panel: {
        backgroundColor: '#ffffff',
        padding: {
          top: 8,
          left: 8,
          right: 8,
          bottom: 8
        },
        border: {
          width: 0.5,
          color: '#c6c6cdff'
        }
      },
      titleLabel: {
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 20,
        fontFamily: [
          'Inter',
          'BlinkMacSystemFont',
          'Segoe UI',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif'
        ],
        fontColor: '#1d1c23ff'
      },
      keyLabel: {
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 16,
        fontFamily: [
          'Inter',
          'BlinkMacSystemFont',
          'Segoe UI',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif'
        ],
        fontColor: '#1d1c23a6',
        spacing: 16
      },
      valueLabel: {
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 16,
        fontFamily: [
          'Inter',
          'BlinkMacSystemFont',
          'Segoe UI',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif'
        ],
        fontColor: '#1d1c23ff'
      },
      shape: {
        spacing: 2
      },
      transitionDuration: 0
    },
    crosshair: {
      linearField: {
        line: {
          style: {
            visible: false
          }
        },
        label: {
          visible: false,
          labelBackground: {
            visible: true
          }
        }
      },
      bandField: {
        line: {
          style: {
            visible: true,
            fill: '#1d1c230d'
          }
        },
        label: {
          visible: false,
          labelBackground: {
            visible: true
          }
        }
      }
    },
    axisBand: {
      paddingOuter: 0
    },
    indicator: {
      title: {
        style: {
          fill: '#1d1c23a6'
        }
      },
      content: {
        style: {
          fill: '#1d1c23ff'
        }
      }
    }
  },
  series: {
    bar: {
      barWidth: '40%',
      bar: {
        style: {
          cornerRadius: [4, 4, 0, 0],
          lineWidth: 0
        },
        state: {
          blur: {
            opacity: 0.2
          }
        }
      },
      barGapInGroup: '1%',
      label: {
        visible: false,
        position: 'outside'
      },
      animationAppear: {
        duration: 800,
        easing: 'quadInOut',
        delay: 0
      },
      animationUpdate: {
        duration: 800,
        easing: 'quadInOut',
        delay: 0
      },
      interactions: [
        {
          type: 'element-highlight-by-group'
        }
      ]
    },
    bar_stack: {
      bar: {
        style: {
          cornerRadius: null
        }
      }
    },
    bar_vertical: {
      stackCornerRadius: [4, 4, 0, 0],
      bar: {
        style: {
          cornerRadius: [4, 4, 0, 0]
        }
      }
    },
    bar_horizontal: {
      stackCornerRadius: [0, 4, 4, 0],
      bar: {
        style: {
          cornerRadius: [0, 4, 4, 0]
        }
      }
    },
    line: {
      line: {
        style: {
          lineWidth: 1,
          curveType: 'linear'
        }
      },
      point: {
        visible: false
      },
      animationAppear: {
        duration: 800,
        easing: 'quadInOut',
        delay: 0
      },
      animationUpdate: {
        duration: 800,
        easing: 'quadInOut',
        delay: 0
      }
    },
    area: {
      line: {
        style: {
          lineWidth: 1,
          curveType: 'linear',
          visible: true
        }
      },
      area: {
        style: {
          fill: {
            gradient: 'linear',
            x0: 0.5,
            y0: 0,
            x1: 0.5,
            y1: 1,
            stops: [
              {
                offset: 0,
                opacity: 1
              },
              {
                offset: 1,
                opacity: 0
              }
            ]
          },
          visible: true
        }
      },
      point: {
        visible: false
      },
      label: {
        visible: false,
        style: {
          fontSize: 12,
          fontWeight: 400,
          lineHeight: 16,
          fontFamily: [
            'Inter',
            'BlinkMacSystemFont',
            'Segoe UI',
            'PingFang SC',
            'Hiragino Sans GB',
            'Microsoft YaHei',
            'Helvetica Neue',
            'Helvetica',
            'Arial',
            'sans-serif'
          ]
        },
        position: 'top'
      },
      animationAppear: {
        duration: 800,
        easing: 'quadInOut',
        delay: 0
      },
      animationUpdate: {
        duration: 800,
        easing: 'quadInOut',
        delay: 800
      }
    },
    pie: {
      outerRadius: 0.9,
      pie: {
        style: {
          cornerRadius: 4
        }
      },
      startAngle: -90,
      padAngle: 0,
      label: {
        visible: false,
        position: 'outside',
        line: {
          visible: true
        }
      },
      animationAppear: {
        duration: 800,
        easing: 'quadInOut',
        delay: 0
      },
      animationUpdate: {
        duration: 800,
        easing: 'quadInOut',
        delay: 0
      }
    },
    funnel: {
      funnel: {
        style: {
          cornerRadius: [4, 4, 4, 4],
          lineWidth: 0
        }
      },
      gap: 1,
      transform: {
        style: {
          fill: '#1d1c230d',
          lineWidth: 0
        }
      },
      label: {
        visible: true,
        style: {
          fontSize: 12,
          fontWeight: 400,
          lineHeight: 16,
          fontFamily: [
            'Inter',
            'BlinkMacSystemFont',
            'Segoe UI',
            'PingFang SC',
            'Hiragino Sans GB',
            'Microsoft YaHei',
            'Helvetica Neue',
            'Helvetica',
            'Arial',
            'sans-serif'
          ],
          fill: '#ffffff'
        }
      },
      transformLabel: {
        visible: false
      },
      outerLabel: {
        visible: false,
        style: {
          fontSize: 12,
          fontWeight: 400,
          lineHeight: 16,
          fontFamily: [
            'Inter',
            'BlinkMacSystemFont',
            'Segoe UI',
            'PingFang SC',
            'Hiragino Sans GB',
            'Microsoft YaHei',
            'Helvetica Neue',
            'Helvetica',
            'Arial',
            'sans-serif'
          ],
          fill: '#1d1c23a6',
          stroke: '#c6c6cdff'
        },
        line: {
          style: {
            visible: true,
            lineWidth: 1,
            stroke: '#c6c6cdff'
          }
        }
      },
      animationAppear: {
        duration: 800,
        easing: 'quadInOut',
        delay: 0
      },
      animationUpdate: {
        duration: 800,
        easing: 'quadInOut',
        delay: 800
      }
    }
  }
}

const chartTheme = {
  color: [
    '#27296d',
    '#005792',
    '#00bbf0',

    '#5e63b6',
    '#a393eb',
    '#3a0088',
    '#4a266a',
    '#7f4a88',
    '#de95ba',

    '#522546',
    '#88304e',
    '#930077',
    '#e61c5d',
    '#ff5722',
    '#ff9a3c',
    '#ffc93c',

    '#48466d',
    '#3d84a8',
    '#46cdcf',

    '#40514e',
    '#11999e',
    '#1fab89',
    '#30e3ca'
  ],
  textStyle: {},
  line: {
    lineStyle: {
      width: 1,
      curveType: 'linear'
    },
    itemStyle: {},
    label: {
      color: 'inherit'
    }
  },
  bar: {
    itemStyle: {
      borderRadius: [4, 4, 0, 0],
      borderWidth: 0
    },
    barWidth: '40%',
    barCategoryGap: '1%',
    label: {
      position: 'outside'
    }
  },
  pie: {
    radius: [null, '90%'],
    itemStyle: {
      borderRadius: 4
    },
    label: {
      color: 'inherit',
      position: 'outside'
    }
  },
  funnel: {
    itemStyle: {
      borderRadius: [4, 4, 4, 4],
      borderWidth: 0
    },
    label: {
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 16,
      fontFamily: [
        'Inter',
        'BlinkMacSystemFont',
        'Segoe UI',
        'PingFang SC',
        'Hiragino Sans GB',
        'Microsoft YaHei',
        'Helvetica Neue',
        'Helvetica',
        'Arial',
        'sans-serif'
      ],
      color: '#ffffff',
      position: 'inside'
    }
  },
  axisPointer: {
    type: 'shadow',
    trigger: 'axis',
    z: 0,
    lineStyle: {
      visible: true,
      color: '#1d1c230d'
    },
    shadowStyle: {
      visible: true,
      color: '#1d1c230d'
    },
    label: {
      show: false,
      padding: [0, 0, 0, 0]
    }
  },
  legend: {
    type: 'scroll',
    orient: 'horizontal',
    top: 'top',
    padding: {
      bottom: 12
    },
    itemGap: 16,
    textStyle: {
      visible: true,
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 16,
      fontFamily: [
        'Inter',
        'BlinkMacSystemFont',
        'Segoe UI',
        'PingFang SC',
        'Hiragino Sans GB',
        'Microsoft YaHei',
        'Helvetica Neue',
        'Helvetica',
        'Arial',
        'sans-serif'
      ],
      color: '#1d1c23a6'
    },
    itemStyle: {},
    pageTextStyle: {
      color: '#1d1c23a6'
    }
  },
  tooltip: {
    padding: [8, 8, 8, 8],
    backgroundColor: '#ffffff',
    borderColor: '#c6c6cdff',
    borderWidth: 0.5,
    textStyle: {
      fontSize: 12,
      fontFamily: [
        'Inter',
        'BlinkMacSystemFont',
        'Segoe UI',
        'PingFang SC',
        'Hiragino Sans GB',
        'Microsoft YaHei',
        'Helvetica Neue',
        'Helvetica',
        'Arial',
        'sans-serif'
      ],
      fontColor: '#1d1c23a6'
    }
  },
  title: {
    textStyle: {
      visible: true,
      fontSize: 18,
      fontWeight: 600,
      lineHeight: 24,
      fontFamily: [
        'Inter',
        'BlinkMacSystemFont',
        'Segoe UI',
        'PingFang SC',
        'Hiragino Sans GB',
        'Microsoft YaHei',
        'Helvetica Neue',
        'Helvetica',
        'Arial',
        'sans-serif'
      ],
      color: '#1d1c23ff'
    },
    subtextStyle: {
      visible: true,
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 20,
      fontFamily: [
        'Inter',
        'BlinkMacSystemFont',
        'Segoe UI',
        'PingFang SC',
        'Hiragino Sans GB',
        'Microsoft YaHei',
        'Helvetica Neue',
        'Helvetica',
        'Arial',
        'sans-serif'
      ],
      color: '#1d1c2359'
    }
  },
  categoryAxis: {
    boundaryGap: true
  },
  valueAxis: {}
}
export const chartSpec = {
  ...chartTheme,
  theme: { ...mainTheme },
  type: 'pie',
  data: [
    {
      id: 'id0',
      values: [
        { type: 'oxygen', value: '46.60' },
        { type: 'silicon', value: '27.72' },
        { type: 'aluminum', value: '8.13' },
        { type: 'iron', value: '5' },
        { type: 'calcium', value: '3.63' },
        { type: 'sodium', value: '2.83' },
        { type: 'potassium', value: '2.59' },
        { type: 'othe rs', value: '3.5' }
      ]
    }
  ],
  outerRadius: 0.8,
  valueField: 'value',
  categoryField: 'type',
  label: {
    visible: true
  },
  tooltip: {
    mark: {
      content: [
        {
          key: datum => datum['type'],
          value: datum => {
            const { hours, minutes, seconds } = formateTime(datum['value'] as unknown as number)
            const value = renderDuration({ hours, minutes, seconds })
            return value
          }
        }
      ]
    }
  },
  background: 'transparent'
}

export const lineSpec = {
  ...chartTheme,
  theme: { ...mainTheme },
  type: 'line',
  data: {
    values: [
      {
        time: '2:00',
        value: 8
      },
      {
        time: '4:00',
        value: 9
      },
      {
        time: '6:00',
        value: 11
      },
      {
        time: '8:00',
        value: 14
      },
      {
        time: '10:00',
        value: 16
      },
      {
        time: '12:00',
        value: 17
      },
      {
        time: '14:00',
        value: 17
      },
      {
        time: '16:00',
        value: 16
      },
      {
        time: '18:00',
        value: 15
      }
    ]
  },
  xField: 'time',
  yField: 'value',
  background: 'transparent'
}
