(defun fr ( n ) "Fibonacci Recursive"
    (cond 
        ((eq n 0)(return-from fr 0))
        ((eq n 1)(return-from fr 1))
     )
     (return-from fr (+ (fr (- n 1)) (fr (- n 2))) )
)

(defun fi ( n ) "Fibonacci Iterative"
    (cond 
        ((eq n 0)(return-from fr 0))
        ((eq n 1)(return-from fr 1))
     )
     
     (defvar fnm1 1)
     (defvar fnm2 0)
     (defvar fn   1)
     (defvar nfn  0)
 
     (loop for x from 1 to (- n 1)
        do
        (block a 
           (setf nfn (+ fnm1 fnm2))
           (setf fnm2 fnm1)
           (setf fnm1 nfn)
        )
     )
 
     (return-from fi nfn)
)
