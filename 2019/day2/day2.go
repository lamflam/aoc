package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func readInput(fname string) (input []int, err error) {
	bytes, err := ioutil.ReadFile(fname)
	if err != nil {
		return nil, err
	}

	line := strings.Replace(string(bytes), "\n", "", -1)
	nums := strings.Split(line, ",")
	input = make([]int, 0, len(nums))
	for _, num := range nums {
		num, err := strconv.Atoi(num)
		if err != nil {
			return nil, err
		}
		input = append(input, num)
	}

	return input, nil
}

func tick(mem []int, ip int) (int, bool) {
	opcode := mem[ip]
	switch opcode {
	case 1:
		mem[mem[ip+3]] = mem[mem[ip+1]] + mem[mem[ip+2]]
		return ip + 4, false
	case 2:
		mem[mem[ip+3]] = mem[mem[ip+1]] * mem[mem[ip+2]]
		return ip + 4, false
	case 99:
		return 0, true
	default:
		panic(fmt.Sprintf("Invalid opcode %d at position %d", opcode, ip))
	}
}

func run(mem []int) {
	ip := 0
	halt := false
	for !halt {
		ip, halt = tick(mem, ip)
	}
}

func part1(input []int) int {
	mem := make([]int, len(input))
	copy(mem, input)
	mem[1] = 12
	mem[2] = 2
	run(mem)
	return mem[0]
}

func part2(input []int, target int) int {
	for i := 0; i < 100; i++ {
		for j := 0; j < 100; j++ {
	        mem := make([]int, len(input))
	        copy(mem, input)
            mem[1] = i
            mem[2] = j
            run(mem)
            if mem[0] == target {
                return 100 * i + j
            }
		}
	}
    return 0
}

func main() {
	input, err := readInput("day2/input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println("part1: ", part1(input))
	fmt.Println("part2: ", part2(input, 19690720))
}
